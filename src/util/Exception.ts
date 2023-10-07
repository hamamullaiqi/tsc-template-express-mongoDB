import { Request, Response } from "express";
export const Exception = async <T>(
    req: Request,
    res: Response,
    callback: () => Promise<T>
) => {
    try {
        const response = await callback();
        res.send({
            status: "success",
            data: response,
        });
    } catch (error) {
        return res.status(500).send({
            status: "Failed",
            message: error?.message || "Server Error",
        });
    }
};
