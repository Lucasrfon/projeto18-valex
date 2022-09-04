import { faker } from '@faker-js/faker';
import { findByTypeAndEmployeeId, insert, TransactionTypes } from "../repositories/cardRepository";
import { findByApiKey } from "../repositories/companyRepository";
import { findById } from "../repositories/employeeRepository";

export async function isValidAPIKey(APIKey: string) {
    if(await findByApiKey(APIKey)) {
        return
    }
    throw { type: "unauthorized", message: "Invalid API Key" }
}

export async function isValidEmployee(id: number) {
    const employee = await findById(id)
    if(employee) {
        return employee.fullName
    }
    throw { type: "employee id", message: "Invalid employee id" }
}

export async function isUniqueCardType(id: number, type: TransactionTypes) {
    if(await findByTypeAndEmployeeId(type, id)) {
        throw { type: "registred", message: "Card already registred" }
    }
}

export async function generateCard(employeeId: number, type: TransactionTypes, fullName: string) {
    const today = new Date();
    const cardNameArray = fullName.toUpperCase().split(" ").filter(name => name.length >= 3);
    for(let i = 1; i < cardNameArray.length - 1; i ++) {
        cardNameArray[i] = cardNameArray[i][0];
    }
    const cardholderName = cardNameArray.join(" ");
    const number = faker.finance.creditCardNumber('63[7-9]#-####-####-###L');
    const expirationDate = `${today.getMonth() < 10 ? '0' + today.getMonth() : today.getMonth()}/${parseInt(today.getFullYear().toString().slice(2)) + 5}`;
    const securityCode = faker.finance.creditCardCVV();

    await insert({
        employeeId,
        number,
        cardholderName,
        securityCode,
        expirationDate,
        isVirtual: false,
        isBlocked: true,
        type
    })
}