import { Request, Response } from "express";
import { isValidAPIKey } from "../services/APIServices";
import { checkPassword, isExpired, isRegistredCard as isRegistredPersonalCard } from "../services/cardServices";
import { checkBalance, compareShopCardType, isActiveCard, isBlocked, isRegisteredBusiness, isRegistredCard, purchase, rechargeCard } from "../services/transactionsServices";

export async function requestRecharge(req: Request, res: Response) {
    const { authorization } = req.headers;
    const { employeeId, type, amount } = req.body;

    if(!authorization) {
        throw { type: "unauthorized", message: "API Key needed" }
    }

    await isValidAPIKey(authorization);
    const card = await isRegistredCard(employeeId, type);
    await isActiveCard(card);
    await isExpired(card);
    await rechargeCard(card, amount);

    res.status(201).send('Card recharged')
}

export async function requestPurchase(req: Request, res: Response) {
    const {number, cardholderName, expirationDate, amount, password, business}: {number: string, cardholderName: string, expirationDate: string, amount: number, password: string, business: number} = req.body;

    const card = await isRegistredPersonalCard(number, cardholderName, expirationDate);
    await isActiveCard(card);
    await isExpired(card);
    await isBlocked(card);
    await checkPassword(card.password, password);
    const shop = await isRegisteredBusiness(business);
    await compareShopCardType(shop.type, card.type);
    await checkBalance(card.id, amount);
    await purchase(card.id, business, amount);

    res.status(200).send('Compra realizada')
}