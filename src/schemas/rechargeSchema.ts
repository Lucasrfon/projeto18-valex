import joi from 'joi';

const rechargeSchema = joi.object({
    "id": joi.number().integer().greater(0).required(),
    "amount": joi.number().integer().greater(0).required()
});

export default rechargeSchema;