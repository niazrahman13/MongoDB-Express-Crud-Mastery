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
exports.userControllers = void 0;
const users_service_1 = require("./users.service");
const user_validation_1 = __importDefault(require("./user.validation"));
// Create User
const createUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const { error, value } = user_validation_1.default.validate(body);
        if (error) {
            res.status(200).json({
                success: "Data Failed",
                Result: error
            });
        }
        const result = yield users_service_1.userServices.createStudentIntoDB(body);
        res.status(200).json({
            success: true,
            message: "User created successfully!",
            data: result
        });
    }
    catch (error) {
        res.status(200).json({
            success: "Data Failed",
            Result: error
        });
    }
});
// Get Users
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield users_service_1.userServices.getAllStudentsFromDB();
        res.status(200).json({
            success: true,
            message: "User fetched successfully!",
            data: result
        });
    }
    catch (error) {
        res.status(404).json({
            "success": false,
            "message": "User not found",
            "error": {
                "code": 404,
                "description": "User not found!"
            }
        });
    }
});
// Get User By Id
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.userId;
        const result = yield users_service_1.userServices.getStudentByIdFromDB(id);
        res.status(200).json({
            success: true,
            message: "User fetched successfully!",
            data: result
        });
    }
    catch (error) {
        res.status(404).json({
            "success": false,
            "message": "User not found",
            "error": {
                "code": 404,
                "description": "User not found!"
            }
        });
    }
});
// Get orders from id by db
const getOrdersById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.userId;
        const result = yield users_service_1.userServices.getOrdersByIdFromDB(id);
        res.status(200).json({
            success: true,
            message: "Orders fetched successfully!",
            data: result
        });
    }
    catch (error) {
        res.status(404).json({
            "success": false,
            "message": "User not found",
            "error": {
                "code": 404,
                "description": "User not found!"
            }
        });
    }
});
// Update User By Id
const updateUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.userId;
        const body = req.body;
        const result = yield users_service_1.userServices.updateUserByIdFromDB(id, body);
        res.status(200).json({
            success: true,
            message: "User updated successfully!",
            data: result
        });
    }
    catch (error) {
        res.status(404).json({
            "success": false,
            "message": "User not found",
            "error": {
                "code": 404,
                "description": "User not found!"
            }
        });
    }
});
// Add new Product in Order
const updateUserByOrderId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.userId;
        const body = req.body;
        const result = yield users_service_1.userServices.updateUserByOrderIdFromDB(id, body);
        console.log(result);
        res.status(200).json({
            success: true,
            message: "Order Created successfully!",
            data: result
        });
    }
    catch (error) {
        res.status(404).json({
            "success": false,
            "message": "User not found",
            "error": {
                "code": 404,
                "description": "User not found!"
            }
        });
    }
});
// Delete Student by id
const deleteUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.userId;
        const result = yield users_service_1.userServices.deleteStudentByIdFromDB(id);
        res.status(200).json({
            success: true,
            message: "User deleted successfully!",
            data: result
        });
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: "User not found",
            error: {
                code: 404,
                description: "User not found!"
            }
        });
    }
});
// Total Price
const totalPrice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.userId);
        const result = yield users_service_1.userServices.totalPriceFromDB(id);
        console.log(result);
        res.status(200).json({
            success: true,
            message: "Total price calculated successfully!",
            data: result
        });
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: "User not found",
            error: {
                code: 404,
                description: "User not found!"
            }
        });
    }
});
exports.userControllers = {
    createUsers,
    getAllUsers,
    getUserById,
    deleteUserById,
    updateUserById,
    updateUserByOrderId,
    getOrdersById,
    totalPrice
};
