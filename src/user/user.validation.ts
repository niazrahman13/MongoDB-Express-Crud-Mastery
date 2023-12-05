import Joi from 'joi';

const fullNameSchema = Joi.object({
    firstName: Joi.string().max(20).required().messages({
        'any.required': 'Please input first name'
    }),
    lastName: Joi.string().max(20).required().messages({
        'any.required': 'Please input last name'
    }),
});

// Define Joi schema for Address
const addressSchema = Joi.object({
    street: Joi.string().required().messages({
        'any.required': 'Please fill the required field'
    }),
    city: Joi.string().required().messages({
        'any.required': 'Please fill the required field'
    }),
    country: Joi.string().required().messages({
        'any.required': 'Please fill the required field'
    }),
});

// Define Joi schema for Orders
const ordersSchema = Joi.object({
    productName: Joi.string().required().messages({
        'any.required': 'Please fill the required field'
    }),
    price: Joi.number().required().messages({
        'any.required': 'Please fill the required field'
    }),
    quantity: Joi.number().required().messages({
        'any.required': 'Please fill the required field'
    }),
});


const joiValidationSchema = Joi.object({
    userId: Joi.number().required().messages({
        'any.required': 'Please fill the required field'
    }),
    username: Joi.string().required().alphanum()
    .min(3)
    .max(30)
    .required().messages({
        'any.required': 'Please fill the required field'
    }),
    password: Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).min(3).messages({
        'string.min': 'Password must be at least 8 characters long'
    }),
    fullName: fullNameSchema.required().messages({
        'any.required': 'Please fill up name'
    }),
    age: Joi.number().required().messages({
        'any.required': 'Please fill the required field'
    }),
    email: Joi.string().required().email().messages({
        'string.email': 'Please enter a valid email address',
        'any.required': 'Please fill the required field'
    }),
    isActive: Joi.boolean().required().messages({
        'any.required': 'Fill this field'
    }),
    hobbies: Joi.array().items(Joi.string()).required().messages({
        'any.required': 'Fill this field'
    }),
    address: addressSchema.required(),
    orders: Joi.array().items(ordersSchema)
})

export default joiValidationSchema;