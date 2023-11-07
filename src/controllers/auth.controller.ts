import express, { Router } from "express";
import { Auth } from "../services/auth.services";
import { checkAuth } from "../middlewares/checkAuth";

const router = Router();

router.post("/register", (req, res) => {
    return Auth.register(req, res);
});
router.post("/login", (req, res) => {
    return Auth.login(req, res);
});
//checkAuth
router.get("/isMe", checkAuth, (req, res) => {
    return Auth.refreshToken(req, res);
});

export default router;
