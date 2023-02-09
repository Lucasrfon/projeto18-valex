import { Request, Response } from "express";
import { TransactionTypes } from "../repositories/cardRepository";
import { isValidAPIKey } from "../services/APIServices";
import { activateCard, checkPassword, generateCard, isActiveCard, isCardBlocked, isEmployeeFromCompany, isExpired, isRegistredCard, isUniqueCardType, isValidCVV, isValidEmployee, toggleBlock } from "../services/cardServices";

export async function requestCardCreation(req: Request, res: Response) {
    const { employeeId, type }: {employeeId: number, type: TransactionTypes} = req.body;
    const APIKey = req.headers["x-api-key"];

    if(!APIKey) {
        throw { type: "unauthorized", message: "API Key needed" }
    }

    const company = await isValidAPIKey(APIKey.toString());
    await isUniqueCardType(employeeId, type);
    const employee = await isValidEmployee(employeeId);
    await isEmployeeFromCompany(employee.companyId, company.id)
    const id = await generateCard(employeeId, type, employee.fullName);

    res.status(201).send(`Card created id: ${id}`);
}

export async function requestCardActivation(req: Request, res: Response) {
    const {id, cvv, password}: {id: number, cvv: string, password: string} = req.body;

    const card = await isRegistredCard(id);
    await isExpired(card);
    await isActiveCard(card);
    await isValidCVV(card, cvv);
    await activateCard(card, password);

    res.status(200).send('Card activated')
}

export async function toggleCardBlock(req: Request, res: Response) {
    const isBlock = (req.path === '/block');
    const {id, password}: {id: number, password: string} = req.body;

    const card = await isRegistredCard(id);
    await isExpired(card);
    await isCardBlocked(card, isBlock);
    await checkPassword(card.password, password);
    await toggleBlock(card, isBlock);

    res.status(200).send(`Card ${isBlock ? 'blocked' : 'unblocked'}`)
}