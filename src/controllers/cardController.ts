import { Request, Response } from "express";
import { TransactionTypes } from "../repositories/cardRepository";
import { generateCard, isUniqueCardType, isValidAPIKey, isValidEmployee } from "../services/cardServices";

export async function requestCardCreation(req: Request, res: Response) {
    const { employeeId, type }: {employeeId: number, type: TransactionTypes} = req.body;
    const { authorization } = req.headers;

    if(!authorization) {
        throw { type: "unauthorized", message: "API Key needed" }
    }

    await isValidAPIKey(authorization);
    const fullName = await isValidEmployee(employeeId);
    //Depois implementar verificação do usuário pertencer a empresa
    await isUniqueCardType(employeeId, type);
    await generateCard(employeeId, type, fullName);

    res.status(201).send('');
}