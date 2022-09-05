import { Card, findByTypeAndEmployeeId, TransactionTypes } from "../repositories/cardRepository";
import { insert } from "../repositories/rechargeRepository";

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
    await insert(recharge)
}