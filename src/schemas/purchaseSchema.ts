import joi from 'joi';
import joiDate from '@joi/date';
const extendedJoi = joi.extend(joiDate)

const purchaseSchema = joi.object({
    "password": joi.string().pattern(/^[0-9]{4}$/).required(),
    "number": joi.string().pattern(/^[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}$/).required(),
    "cardholderName": joi.string().pattern(/^[A-Za-zÀ-ÖØ-öø-ÿ ]*$/).required(),
    "expirationDate": extendedJoi.date().format('MM/YY').required(),
    "amount": joi.number().integer().greater(0).required(),
    "business": joi.number().integer().greater(0).required()
});

export default purchaseSchema;