"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
//  Name Schema
const FullName = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: [true, 'Pleas input first name']
    },
    lastName: {
        type: String,
        required: [true, 'Pleas input last name']
    }
});
// Address Schema
const Address = new mongoose_1.Schema({
    street: {
        type: String,
        required: [true, "Please fill the required Field"],
    },
    city: {
        type: String,
        required: [true, "Please fill the required Field"],
    },
    country: {
        type: String,
        required: [true, "Please fill the required Field"],
    }
});
// Orders Schema
const Orders = new mongoose_1.Schema({
    productName: {
        type: String,
        required: [true, "Please fill the required Field"],
    },
    price: {
        type: Number,
        required: [true, "Please fill the required Field"],
    },
    quantity: {
        type: Number,
        required: [true, "Please fill the required Field"],
    }
});
// Main SCHEMA
const usersSchema = new mongoose_1.Schema({
    userId: {
        type: Number,
        required: [true, "Please fill the required Field"],
        unique: true
    },
    username: {
        type: String,
        required: [true, "Please fill the required Field"],
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    fullName: {
        type: FullName,
        required: [true, 'Please Fill up Name']
    },
    age: {
        type: Number,
        required: [true, "Please fill the required Field"]
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
    },
    isActive: {
        type: Boolean,
        required: [true, 'Fill this Field'],
        default: true
    },
    hobbies: {
        type: [String],
        required: [true, 'Fill this Field'],
    },
    address: Address,
    orders: [Orders],
}, { versionKey: false });
// Pre save middleware 
usersSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        user.password = yield bcrypt_1.default.hash(user.password, 12);
        next();
    });
});
// Post save middleware
usersSchema.post('save', function (document, next) {
    document.password = undefined; // We can use undefined for removing any particular field
    next();
});
const usersModel = (0, mongoose_1.model)('usersModels', usersSchema);
exports.default = usersModel;
