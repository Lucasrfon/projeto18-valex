import joi from 'joi';

const rechargeSchema = joi.object({
    "employeeId": joi.number().integer().required(),
    "type": joi.string().valid('groceries', 'restaurant', 'transport', 'education', 'health').required(),
    "charge": joi.number().integer().greater(0).required()
});

export default rechargeSchema;