import express, { Router } from "express";
import { Product } from "../services/product.service";
import { Auth } from "../services/auth.services";

const router = Router();

router.post("/register", (req, res) => {
    return Auth.register(req, res);
});
router.post("/login", (req, res) => {
    return Auth.login(req, res);
});

export default router;
