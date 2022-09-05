import joi from 'joi';
import joiDate from '@joi/date';
const extendedJoi = joi.extend(joiDate)

const onlinePurchaseSchema = joi.object({
    "cvv": joi.string().pattern(/^[0-9]{3}$/).required(),
    "number": joi.string().pattern(/^[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}$/).required(),
    "cardholderName": joi.string().pattern(/^[A-Za-zÀ-ÖØ-öø-ÿ ]*$/).required(),
    "expirationDate": extendedJoi.date().format('MM/YY').required(),
    "amount": joi.number().integer().greater(0).required(),
    "businessId": joi.number().integer().greater(0).required()
});

export default onlinePurchaseSchema;