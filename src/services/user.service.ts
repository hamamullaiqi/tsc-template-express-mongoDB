import { Request, Response } from "express";
import { BaseRepository } from "../util/BaseRepository";
import userSchema from "../schema/user.schema";
import { IRequestPaging } from "../interfaces";

export class User {
    static async getAll(req: Request, res: Response) {
        return await new BaseRepository(req, res, userSchema).getAll(
            "-password"
        );
    }
    static async create(req: Request, res: Response) {
        const { body } = req;
        return await new BaseRepository(req, res, userSchema).create(body);
    }
    static async update(req: Request, res: Response) {
        const { id } = req.params;
        const { body } = req;
        return await new BaseRepository(req, res, userSchema).update(id, body);
    }
    static async delete(req: Request, res: Response) {
        const { id } = req.params;
        return await new BaseRepository(req, res, userSchema).update(id, {
            deleted: 1,
        });
    }
    static async getOne(req: Request, res: Response) {
        const { id } = req.params;
        return await new BaseRepository(req, res, userSchema).getOne(
            id,
            "-password"
        );
    }
    static async paging(req: Request, res: Response) {
        const { page, perPage, search, filters } =
            req.query as unknown as IRequestPaging;
        const otherFilters = !!filters ? JSON.parse(filters) : {};
        const filtersObj = {
            ...(!!search && {
                $or: [{ username: new RegExp(search, "i") }],
            }),
            ...otherFilters,
        };
        return await new BaseRepository(req, res, userSchema).paging(
            page,
            perPage,
            filtersObj,
            "-password"
        );
    }
}
