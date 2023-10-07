import { Schema, model } from "mongoose";
import { IProduct } from "../interfaces";

const productSCH = new Schema<IProduct>(
    {
        code: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        deleted: { type: Number, default: 0 },
    },
    { timestamps: true }
);

productSCH.index({ code: -1 });
productSCH.index({ name: -1 });

export default model("products", productSCH);
