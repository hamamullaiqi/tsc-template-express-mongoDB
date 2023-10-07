import { BaseRepository } from "../util/BaseRepository";
import { Request, Response } from "express";

import productSchema from "../schema/product.schema";
import { IRequestPaging } from "../interfaces";

export class Product {
    static async getAll(req: Request, res: Response) {
        return await new BaseRepository(req, res, productSchema).getAll();
    }
    static async create(req: Request, res: Response) {
        const { body } = req;
        return await new BaseRepository(req, res, productSchema).create(body);
    }
    static async update(req: Request, res: Response) {
        const { id } = req.params;
        const { body } = req;
        return await new BaseRepository(req, res, productSchema).update(
            id,
            body
        );
    }
    static async delete(req: Request, res: Response) {
        const { id } = req.params;
        return await new BaseRepository(req, res, productSchema).update(id, {
            deleted: 1,
        });
    }
    static async getOne(req: Request, res: Response) {
        const { id } = req.params;
        return await new BaseRepository(req, res, productSchema).getOne(id);
    }
    static async paging(req: Request, res: Response) {
        const { page, perPage, search, filters } =
            req.query as unknown as IRequestPaging;
        const otherFilters = !!filters ? JSON.parse(filters) : {};
        const filtersObj = {
            ...(!!search && {
                $or: [
                    {
                        code: new RegExp(search, "i"),
                    },
                    { name: new RegExp(search, "i") },
                ],
            }),
            ...otherFilters,
        };
        return await new BaseRepository(req, res, productSchema).paging(
            page,
            perPage,
            filtersObj
        );
    }
}
