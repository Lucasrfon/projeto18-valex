import joi from 'joi';

const cardActivationSchema = joi.object({
    "cvv": joi.string().pattern(/^[0-9]{3}$/).required(),
    "senha": joi.string().required()
});

export default cardActivationSchema;