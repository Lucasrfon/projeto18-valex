import joi from 'joi';

const rechargeSchema = joi.object({
    "employeeId": joi.number().integer().greater(0).required(),
    "type": joi.string().valid('groceries', 'restaurant', 'transport', 'education', 'health').required(),
    "amount": joi.number().integer().greater(0).required()
});

export default rechargeSchema;