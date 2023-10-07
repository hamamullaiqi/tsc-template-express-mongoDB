import { Request } from "express";

export interface IProduct {
    code: string;
    name: string;
    deleted: number;
}

export interface IUser {
    username: string;
    email: string;
    password: string;
    fullname: string;
    image?: string;
    deleted: number;
}

export interface IRequestLocals extends Request {
    locals: {
        user: Record<any, any>;
    };
}

export interface IRequestPaging extends Request {
    page: string;
    perPage: string;
    search: string;
    filters: string; //string object ="{}"
}
