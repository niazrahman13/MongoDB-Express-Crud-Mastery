"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const fullNameSchema = joi_1.default.object({
    firstName: joi_1.default.string().max(20).required().messages({
        'any.required': 'Please input first name'
    }),
    lastName: joi_1.default.string().max(20).required().messages({
        'any.required': 'Please input last name'
    }),
});
// Define Joi schema for Address
const addressSchema = joi_1.default.object({
    street: joi_1.default.string().required().messages({
        'any.required': 'Please fill the required field'
    }),
    city: joi_1.default.string().required().messages({
        'any.required': 'Please fill the required field'
    }),
    country: joi_1.default.string().required().messages({
        'any.required': 'Please fill the required field'
    }),
});
// Define Joi schema for Orders
const ordersSchema = joi_1.default.object({
    productName: joi_1.default.string().required().messages({
        'any.required': 'Please fill the required field'
    }),
    price: joi_1.default.number().required().messages({
        'any.required': 'Please fill the required field'
    }),
    quantity: joi_1.default.number().required().messages({
        'any.required': 'Please fill the required field'
    }),
});
const joiValidationSchema = joi_1.default.object({
    userId: joi_1.default.number().required().messages({
        'any.required': 'Please fill the required field'
    }),
    username: joi_1.default.string().required().alphanum()
        .min(3)
        .max(30)
        .required().messages({
        'any.required': 'Please fill the required field'
    }),
    password: joi_1.default.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).min(8).messages({
        'string.min': 'Password must be at least 8 characters long'
    }),
    fullName: fullNameSchema.required().messages({
        'any.required': 'Please fill up name'
    }),
    age: joi_1.default.number().required().messages({
        'any.required': 'Please fill the required field'
    }),
    email: joi_1.default.string().required().email().messages({
        'string.email': 'Please enter a valid email address',
        'any.required': 'Please fill the required field'
    }),
    isActive: joi_1.default.boolean().required().messages({
        'any.required': 'Fill this field'
    }),
    hobbies: joi_1.default.array().items(joi_1.default.string()).required().messages({
        'any.required': 'Fill this field'
    }),
    address: addressSchema.required(),
    orders: joi_1.default.array().items(ordersSchema)
});
exports.default = joiValidationSchema;
