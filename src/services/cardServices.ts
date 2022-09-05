import bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';
import Cryptr from 'cryptr';
import { Card, findById as findCardById, findByTypeAndEmployeeId, insert, TransactionTypes, update } from "../repositories/cardRepository";
import { findById as findEmployee } from "../repositories/employeeRepository";
const cryptr = new Cryptr('myTotallySecretKey');

export async function isValidEmployee(id: number) {
    const employee = await findEmployee(id)
    if(employee) {
        return employee.fullName
    }
    throw { type: "not found", message: "Invalid employee id" }
}

export async function isUniqueCardType(id: number, type: TransactionTypes) {
    if(await findByTypeAndEmployeeId(type, id)) {
        throw { type: "registred", message: "Card already registred" }
    }
}

export async function generateCard(employeeId: number, type: TransactionTypes, fullName: string) {
    const today = new Date();
    const month = today.getMonth();
    const expirationYear = parseInt(today.getFullYear().toString().slice(2)) + 5;
    const cardNameArray = fullName.toUpperCase().split(" ").filter(name => name.length >= 3);
    for(let i = 1; i < cardNameArray.length - 1; i ++) {
        cardNameArray[i] = cardNameArray[i][0];
    }
    const cardholderName = cardNameArray.join(" ");
    const number = faker.finance.creditCardNumber('63[7-9]#-####-####-###L');
    const expirationDate = `${month < 10 ? '0' + month : month}/${expirationYear}`;
    const cvv = faker.finance.creditCardCVV();
    const securityCode = cryptr.encrypt(cvv);

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

export async function isRegistredCard(id: number) {
    const findSecurityCode = await findCardById(id);

    if(findSecurityCode) {
        return findSecurityCode
    }

    throw { type: "not found", message: "Invalid card" }
}

export async function isValidCVV(card: Card, cvv: string) {
    const securityCode = cryptr.decrypt(card.securityCode);
    
    if(securityCode === cvv) {
        return
    }

    throw { type: "not found", message: "Invalid card" }
}

export async function isExpired(card: Card) {
    const today = new Date();
    const month = today.getMonth();
    const year = parseInt(today.getFullYear().toString().slice(2));

    if(year < parseInt(card.expirationDate.slice(3))) {
        return
    };

    if(year > parseInt(card.expirationDate.slice(3))) {
        throw { type: "denied", message: "Card expired" }
    }
    
    if(month <= parseInt(card.expirationDate.slice(0, 2))) {
        return
    }
    
    throw { type: "denied", message: "Card expired" }
}

export async function isActiveCard(card: Card) {
    if(card.password) {
        throw { type: "registred", message: "Card already activated" }
    }
}

export async function activateCard(card: Card, rawPassword: string) {
    const password = bcrypt.hashSync(rawPassword, 5);

    await update(card.id, {...card, password});
}

export async function isCardBlocked(card: Card, isBlock: boolean) {
    if(card.isBlocked === isBlock) {
        throw { type: "registred", message: `Card already ${isBlock ? 'blocked' : 'unblocked'}` }
    }
}

export async function checkPassword(cardPassword: string | undefined, password: string) {
    const isPasswordValid = cardPassword ? bcrypt.compareSync(password, cardPassword) : null

    if(isPasswordValid) {
        return
    }
    throw { type: "not found", message: "Wrong password" }
}

export async function toggleBlock(card: Card, isBlock: boolean) {
    await update(card.id, {...card, isBlocked: isBlock});
}