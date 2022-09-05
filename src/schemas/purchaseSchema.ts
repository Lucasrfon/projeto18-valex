import joi from 'joi';

const purchaseSchema = joi.object({
    "id": joi.number().integer().greater(0).required(),
    "password": joi.string().pattern(/^[0-9]{4}$/).required(),
    "amount": joi.number().integer().greater(0).required(),
    "businessId": joi.number().integer().greater(0).required()
});

export default purchaseSchema;