import express, { Router } from "express";
import ProductController from "./controllers/product.controller";
import UserController from "./controllers/user.controller";

const router = Router();

router.use("/product", ProductController);
router.use("/user", UserController);

export default router;
