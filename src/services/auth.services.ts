import Joi from "joi";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userSchema from "../schema/user.schema";
import { Request, Response } from "express";
import { IResponseLocals } from "../interfaces";

export class Auth {
    static async register(req: Request, res: Response) {
        const schema = Joi.object({
            username: Joi.string().min(5).required(),
            email: Joi.string().email().min(5).required(),
            password: Joi.string().min(6).required(),
            // role: Joi.string().required(),
        });

        const { error } = schema.validate(req.body);

        if (error)
            return res.status(400).send({
                error: {
                    message: error.details[0].message,
                },
            });

        try {
            //time bcrypt
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);

            //validate user exits
            const userExist = await userSchema.findOne({
                where: {
                    username: req.body.username,
                },
            });

            if (!userExist) {
                const newUser = await userSchema.create({
                    username: req.body.username,
                    email: req.body.email,
                    password: hashedPassword,
                    // role: req.body.role
                });

                const token = jwt.sign(
                    { email: newUser.email },
                    process.env.SECRET_KEY as string,
                    { expiresIn: "1h" }
                );
                res.status(201).send({
                    status: "success",
                    message: "Register Succeess",
                    data: {
                        user: {
                            id: newUser.id,
                            usernmae: newUser.username,

                            token,
                        },
                    },
                });
            } else {
                return res.status(400).send({
                    status: "failed",
                    message: "User already exists",
                });
            }
        } catch (error) {
            console.log(error);
            res.status(500).send({
                status: "failed",
                message: "Server Error",
            });
        }
    }
    static async login(req: Request, res: Response) {
        const schema = Joi.object({
            username: Joi.string().required(),
            password: Joi.string().min(6).required(),
            app: Joi.string(),
        });

        const { error } = schema.validate(req.body);

        if (error) {
            return res.status(400).send({
                staus: "Invalid Input",
                message: error.details[0].message,
            });
        }

        try {
            let userExist = await userSchema.findOne({
                username: req.body.username,
            });

            userExist = JSON.parse(JSON.stringify(userExist));

            if (!userExist) {
                return res.status(400).send({
                    status: "failed",
                    message: "unregistered account",
                });
            }

            console.log(req.body.password, userExist.password);
            const isValid = await bcrypt.compare(
                req.body.password,
                userExist.password
            );

            if (!isValid) {
                return res.status(400).send({
                    status: "failed",
                    message: "password invalid",
                });
            }

            const token = jwt.sign(
                { ...userExist },
                process.env.SECRET_KEY as string
            );

            return res.status(200).send({
                status: "success",
                message: "Login Success",

                token,
                // user: {
                //     id: userExist.id,
                //     username: userExist.username,
                //     role: userExist.role,
                //     email: userExist.email,
                //     image: userExist?.image,
                //     token,
                // },
            });
        } catch (error) {
            console.log(error);
            return res.status(500).send({
                status: "failed",
                message: "Server Error",
            });
        }
    }

    static async refreshToken(req: Request, res: Response) {
        try {
            const user = (res as IResponseLocals)?.locals?.user;

            const dataUser = await userSchema.findOne({
                _id: user,
            });

            // data = JSON.parse(JSON.stringify(data));
            // console.log(data);

            // data = {
            //   ...data,
            //   image: process.env.FILE_PATH + data.image,
            // };

            if (!dataUser) {
                return res.status(404).send({
                    status: "FAILED",
                    message: "user tidak di temukan",
                });
            }

            res.send({
                status: "success...",
                data: { dataUser },
            });
        } catch (error) {
            console.log(error.message);
            res.status(500).send({
                status: "FAILED",
                message: error?.message || "Server Error",
            });
        }
    }
}
