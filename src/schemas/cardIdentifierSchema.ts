import joi from 'joi';

const cardIdentifierSchema = joi.object({
    "id": joi.number().integer().greater(0).required(),
    "password": joi.string().pattern(/^[0-9]{4}$/).required()
});

export default cardIdentifierSchema;