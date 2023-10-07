import { Schema, model } from "mongoose";
import { IUser } from "../interfaces";

const userSCH = new Schema<IUser>(
    {
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        fullname: { type: String, required: true },
        image: { type: String },
        deleted: { type: Number, default: 0 },
    },
    { timestamps: true }
);

userSCH.index({ username: -1, email: -1 });

export default model("users", userSCH);
