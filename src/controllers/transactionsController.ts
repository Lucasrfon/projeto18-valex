import { Request, Response } from "express";
import { isValidAPIKey } from "../services/APIServices";
import { checkPassword, isExpired, isRegistredCard } from "../services/cardServices";
import { checkBalance, compareShopCardType, isActiveCard, isBlocked, isRegisteredBusiness, isValidCard, purchase, rechargeCard } from "../services/transactionsServices";

export async function requestRecharge(req: Request, res: Response) {
    const { id, amount } = req.body;
    const APIKey = req.headers["x-api-key"];

    if(!APIKey) {
        throw { type: "unauthorized", message: "API Key needed" }
    }

    await isValidAPIKey(APIKey.toString());
    const card = await isRegistredCard(id);
    await isActiveCard(card);
    await isExpired(card);
    await rechargeCard(card, amount);

    res.status(201).send('Card recharged')
}

export async function requestPurchase(req: Request, res: Response) {
    const {id, amount, password, businessId}: {id: number, amount: number, password: string, businessId: number} = req.body;

    const card = await isRegistredCard(id);
    await isActiveCard(card);
    await isExpired(card);
    await isBlocked(card);
    await checkPassword(card.password, password);

    const shop = await isRegisteredBusiness(businessId);
    await compareShopCardType(shop.type, card.type);

    await checkBalance(card.id, amount);
    await purchase(card.id, businessId, amount);

    res.status(200).send('Compra realizada')
}

export async function requestCardHistory(req: Request, res: Response) {
    const id = parseInt(req.params.id);

    if(!id) {
        throw { type: "not found", message: "Invalid card" }
    }
    
    await isRegistredCard(id);
    const values = await checkBalance(id);
    const history = {
        balance: values ? values.balance : 0,
        transactions: values?.outcomeArray,
        recharges: values?.incomeArray
    }

    res.status(200).send(history)
}

export async function requestOnlinePurchase(req: Request, res: Response) {
    const {cvv, number, cardholderName, expirationDate, amount, businessId}: {cvv: string, number: string, cardholderName: string, expirationDate: string, amount: number, businessId: number} = req.body;

    const card = await isValidCard(number, cardholderName, expirationDate, cvv);
    await isExpired(card);
    await isBlocked(card);

    const shop = await isRegisteredBusiness(businessId);
    await compareShopCardType(shop.type, card.type);

    await checkBalance(card.id, amount);
    await purchase(card.id, businessId, amount);

    res.status(200).send('Compra realizada')
}