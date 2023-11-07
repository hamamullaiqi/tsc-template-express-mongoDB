import express, { Router } from "express";
import { User } from "../services/user.service";

const router = Router();

router.get("/", async (req, res) => {
    return await User.getAll(req, res);
});
router.get("/paging", async (req, res) => {
    return await User.paging(req, res);
});
router.get("/:id", async (req, res) => {
    return await User.getOne(req, res);
});
router.post("/add", async (req, res) => {
    return await User.create(req, res);
});

router.post("/update/:id", async (req, res) => {
    return await User.update(req, res);
});

router.post("/delete/:id", async (req, res) => {
    return await User.delete(req, res);
});

export default router;
