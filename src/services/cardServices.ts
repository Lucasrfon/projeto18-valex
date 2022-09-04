import { findByTypeAndEmployeeId, TransactionTypes } from "../repositories/cardRepository";
import { findByApiKey } from "../repositories/companyRepository";
import { findById } from "../repositories/employeeRepository";

export async function isValidAPIKey(APIKey: string) {
    if(await findByApiKey(APIKey)) {
        return
    }
    throw { type: "unauthorized", message: "Invalid API Key" }
}

export async function isValidEmployee(id: number) {
    if(await findById(id)) {
        return
    }
    throw { type: "employee id", message: "Invalid employee id" }
}

export async function isUniqueCardType(id: number, type: TransactionTypes) {
    if(await findByTypeAndEmployeeId(type, id)) {
        throw { type: "registred", message: "Card already registred" }
    }
}