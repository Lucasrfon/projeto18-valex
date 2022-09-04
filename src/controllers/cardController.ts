import { Request, Response } from "express";
import { TransactionTypes } from "../repositories/cardRepository";
import { isUniqueCardType, isValidAPIKey, isValidEmployee } from "../services/cardServices";

export async function requestCardCreation(req: Request, res: Response) {
    const { employeeId, type }: {employeeId: number, type: TransactionTypes} = req.body;
    const { authorization } = req.headers;

    if(!authorization) {
        throw { type: "unauthorized", message: "API Key needed" }
    }

    await isValidAPIKey(authorization);
    await isValidEmployee(employeeId);
    await isUniqueCardType(employeeId, type);


    // await generateCard(employeeId, type);

    res.status(201).send('ajustar com número do card e outras cositas')
}