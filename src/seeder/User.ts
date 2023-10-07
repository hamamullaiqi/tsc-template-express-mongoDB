import { Request, Response } from "express";
import userSchema from "../schema/user.schema";
import { Exception } from "../util/Exception";
import { hashedPassword } from "../util/hashedPassword";
import { closeConnectDB, connectDB } from "../config/db";
import dotenv from "dotenv";

export const createDefaultUser = async () => {
    try {
        dotenv.config();
        connectDB();
        const def = process.env.DEFAUTL_USER_PASS as string;
        const hashPassword = await hashedPassword(def);
        await userSchema.create({
            username: "admin",
            password: hashPassword,
            fullname: "Super Admin",
            email: "admin@admin.com",
        });
        console.log("success create default user");
        closeConnectDB();
        return;
    } catch (error) {
        throw Error(error);
    }
};
