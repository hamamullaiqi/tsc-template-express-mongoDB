import { Schema, model } from "mongoose";
import { IRole } from "../interfaces";

const roleSCH = new Schema<IRole>(
    {
        name: { type: String, required: true, unique: true },
        permissions: { type: Schema.Types.Mixed },
        deleted: { type: Number, default: 0 },
    },
    { timestamps: true }
);

roleSCH.index({ name: -1 });

export default model("roles", roleSCH);
