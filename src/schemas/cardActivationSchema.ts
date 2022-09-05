import joi from 'joi';

const cardActivationSchema = joi.object({
    "id": joi.number().integer().greater(0).required(),
    "cvv": joi.string().pattern(/^[0-9]{3}$/).required(),
    "password": joi.string().pattern(/^[0-9]{4}$/).required()
});

export default cardActivationSchema;