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
exports.userServices = void 0;
const users_model_1 = __importDefault(require("./users.model"));
// Create Students
const createStudentIntoDB = (student) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield users_model_1.default.create(student); // Built in Static Method
    return result;
});
// Get Students Info
const getAllStudentsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const excludedFields = ['userId', 'password', 'hobbies', 'isActive', 'isDeleted', 'orders'];
    const query = users_model_1.default.find().select(`-${excludedFields.join(' -')}`);
    const result = query.exec();
    return result;
});
// Get Student info by ID
const getStudentByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const excludedFields = ['password', 'hobbies', 'isActive', 'isDeleted', 'orders'];
    const query = users_model_1.default.findOne({ userId: id }).select(`-${excludedFields.join(' -')}`);
    const result = yield query.exec();
    return result;
});
// get orders by id
const getOrdersByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const excludedFields = ['userId', 'username', 'password', 'fullName', 'age', 'email', 'isActive', 'hobbies', 'address'];
    const query = users_model_1.default.findOne({ userId: id }).select(`-${excludedFields.join(' -')}`);
    const data = query.exec();
    return data;
});
// Update User Info by id
const updateUserByIdFromDB = (id, body) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield users_model_1.default.updateOne({ userId: id }, { $set: body });
    return result;
});
// Update User Info by id
const updateUserByOrderIdFromDB = (id, body) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield users_model_1.default.updateOne({ userId: id }, { $addToSet: { orders: body } });
    return result;
});
// Delete student by Id
const deleteStudentByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield users_model_1.default.deleteOne({ userId: id });
    return result;
});
// Total Price
const totalPriceFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield users_model_1.default.aggregate([
        { $match: { "userId": id } },
        {
            $unwind: "$orders"
        },
        {
            $group: {
                _id: null,
                totalPrice: { $sum: "$orders.price" }
            }
        },
        {
            $project: {
                _id: 0,
                totalPrice: 1
            }
        }
    ]);
    return result;
});
exports.userServices = {
    createStudentIntoDB,
    getAllStudentsFromDB,
    getStudentByIdFromDB,
    deleteStudentByIdFromDB,
    updateUserByIdFromDB,
    updateUserByOrderIdFromDB,
    getOrdersByIdFromDB,
    totalPriceFromDB
};
