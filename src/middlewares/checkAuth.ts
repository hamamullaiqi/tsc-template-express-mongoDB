import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const checkAuth = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.header("Authorization");
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).send({
            message: "Access Denied",
        });
    }

    try {
        const secretKey = process.env.SECRET_KEY as string;
        const verified = await jwt.verify(token, secretKey);
        res.locals.user = verified;
        next();
    } catch (error) {
        console.log(error.message);
        res.status(400).send({
            message: "invalid Token",
        });
    }
};
