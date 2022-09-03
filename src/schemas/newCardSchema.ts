import joi from 'joi';

const newCardSchema = joi.object({
    "employeeId": joi.number().required(),
    "type": joi.string().valid('groceries', 'restaurants', 'transport', 'education', 'health').required()
});

export default newCardSchema;