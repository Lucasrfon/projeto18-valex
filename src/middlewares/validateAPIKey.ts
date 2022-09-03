import { Request, Response, NextFunction } from "express";
import { findByApiKey } from "../repositories/companyRepository";

export async function validateAPIKey(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    if(!authorization) throw { type: "unauthorized", message: "API Key needed" };

    return await findByApiKey(authorization)
}