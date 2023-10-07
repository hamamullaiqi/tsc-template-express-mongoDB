import express, { Router } from "express";
import { Product } from "../services/product.service";

const router = Router();

router.get("/", async (req, res) => {
    return await Product.getAll(req, res);
});
router.get("/paging", async (req, res) => {
    return await Product.paging(req, res);
});
router.get("/:id", async (req, res) => {
    return await Product.getOne(req, res);
});
router.post("/add", async (req, res) => {
    return await Product.create(req, res);
});

router.post("/update/:id", async (req, res) => {
    return await Product.update(req, res);
});

router.post("/delete/:id", async (req, res) => {
    return await Product.delete(req, res);
});

export default router;
