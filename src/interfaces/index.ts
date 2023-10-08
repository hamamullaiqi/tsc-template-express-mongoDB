import { Request, Response } from "express";

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

export interface IResponseLocals extends Response {
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
