import express, { Router } from "express";
import ProductController from "./controllers/product.controller";

const router = Router();

router.use("/product", ProductController);

export default router;
