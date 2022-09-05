import { findById } from "../repositories/businessRepository";
import { Card, findByTypeAndEmployeeId, TransactionTypes } from "../repositories/cardRepository";
import { findByCardId as findPayments, insert as insertPayment } from "../repositories/paymentRepository";
import { findByCardId as findRecharges, insert as insertRecharge } from "../repositories/rechargeRepository";

export async function isRegistredCard(employeeId: number, type: TransactionTypes) {
    const findCard = await findByTypeAndEmployeeId(type, employeeId);

    if(findCard) {
        return findCard
    }

    throw { type: "not found", message: "Invalid card" }
}

export async function isActiveCard(card: Card) {
    if(card.password) {
        return
    }
    throw { type: "registred", message: "Card not activated" }
}

export async function rechargeCard(card: Card, amount: number) {
    const recharge = {cardId: card.id, amount}
    await insertRecharge(recharge)
}

export async function isBlocked(card: Card) {
    if(card.isBlocked) {
        throw { type: "denied", message: "Card blocked" }
    }
}

export async function isRegisteredBusiness(id: number) {
    const business = await findById(id);

    if(business) {
        return business
    }
    throw { type: "not found", message: "Business not registered" }
}

export async function compareShopCardType(shopType: string, cardType: string) {
    if(shopType !== cardType) {
        throw { type: "denied", message: "Card not allowed to buy in this business" }
    }
}

export async function checkBalance(id: number, amount: number) {
    const incomeArray = await findRecharges(id);
    const outcomeArray = await findPayments(id);
    let income = 0;
    let outcome = 0;

    for(let i = 0; i < incomeArray.length; i++) {
        income += incomeArray[i].amount;
    }

    for(let i = 0; i < outcomeArray.length; i++) {
        outcome += outcomeArray[i].amount;
    }
    
    const balance = income - outcome - amount;

    if(balance < 0) {
        throw { type: "denied", message: "Not enough balance" }
    }
}

export async function purchase(cardId: number, businessId: number, amount: number) {
    await insertPayment({cardId, businessId, amount})
}