import { Request, Response } from "express";
import { TransactionTypes } from "../repositories/cardRepository";
import { activateCard, generateCard, isActiveCard, isExpired, isRegistredCard, isUniqueCardType, isValidAPIKey, isValidCVV, isValidEmployee } from "../services/cardServices";

export async function requestCardCreation(req: Request, res: Response) {
    const { employeeId, type }: {employeeId: number, type: TransactionTypes} = req.body;
    const { authorization } = req.headers;

    if(!authorization) {
        throw { type: "unauthorized", message: "API Key needed" }
    }

    await isValidAPIKey(authorization);
    await isUniqueCardType(employeeId, type);
    const fullName = await isValidEmployee(employeeId);
    //Depois implementar verificação do usuário pertencer a empresa
    await generateCard(employeeId, type, fullName);

    res.status(201).send('');
}

export async function requestCardActivation(req: Request, res: Response) {
    const {number, cardholderName, expirationDate, cvv, password}: {number: string, cardholderName: string, expirationDate: string, cvv: string, password: string} = req.body;

    const card = await isRegistredCard(number, cardholderName, expirationDate);
    await isValidCVV(card, cvv);
    await isExpired(card);
    await isActiveCard(card);
    await activateCard(card, password);

    res.status(200).send('Cartão ativado')
}