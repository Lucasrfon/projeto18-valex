import { Request, Response } from "express";
import { isValidAPIKey } from "../services/APIServices";
import { isExpired } from "../services/cardServices";
import { isActiveCard, isRegistredCard, rechargeCard } from "../services/transactionsServices";

export async function requestRecharge(req: Request, res: Response) {
    const { authorization } = req.headers;
    const { employeeId, type, charge } = req.body;

    if(!authorization) {
        throw { type: "unauthorized", message: "API Key needed" }
    }

    await isValidAPIKey(authorization);
    const card = await isRegistredCard(employeeId, type);
    await isActiveCard(card);
    await isExpired(card);
    await rechargeCard(card, charge);

    res.status(201).send('Card recharged')
}