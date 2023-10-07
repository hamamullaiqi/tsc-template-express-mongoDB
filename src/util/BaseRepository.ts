import { Request, Response } from "express";
import mongoose, { Model, UpdateWriteOpResult } from "mongoose";
import { Exception } from "./Exception";
export class BaseRepository {
    private schema: Model<any, {}, {}, {}, any>;
    private req: Request;
    private res: Response;
    constructor(
        req: Request,
        res: Response,
        schema: Model<any, {}, {}, {}, any>
    ) {
        this.schema = schema;
        this.req = req;
        this.res = res;
    }

    async getAll() {
        return Exception(this.req, this.res, async () => {
            return await this.schema.find({ deleted: 0 });
        });
    }
    async paging(
        page: string | undefined = "1",
        perPage: string | undefined = "8",
        filters: Record<any, any>
    ) {
        return Exception(this.req, this.res, async () => {
            const offset: number = (Number(page) - 1) * Number(perPage);
            let [data, total] = await Promise.all([
                this.schema.find(filters).skip(offset).limit(parseInt(perPage)),
                this.schema.find(filters).count(),
            ]);
            return {
                rows: data,
                page: {
                    size: Number(perPage),
                    totalrows: total,
                    totalPages: Math.ceil(total / Number(perPage)),
                    current: Number(page),
                },
            };
        });
    }
    async getOne(_id: string) {
        return Exception(this.req, this.res, async () => {
            const existing = await this.schema.findOne({ _id, deleted: 0 });
            if (!existing) throw Error("Data Not Found");
            return existing;
        });
    }
    async create(body: Record<any, any>) {
        return Exception(this.req, this.res, async () => {
            return await this.schema.create(body);
        });
    }
    async update(_id: string, body: Record<any, any>) {
        return Exception(this.req, this.res, async () => {
            const existing = await this.schema.findOne({ _id, deleted: 0 });
            if (!existing) throw Error("Data Not Found");
            return await this.schema.findByIdAndUpdate({ _id }, body);
        });
    }
}
