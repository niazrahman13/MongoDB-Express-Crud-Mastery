"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const users_controller_1 = require("./users.controller");
const router = express_1.default.Router();
router.post('/createUsers', users_controller_1.userControllers.createUsers);
router.get('/getUsers', users_controller_1.userControllers.getAllUsers);
router.get('/:userId/getUsers', users_controller_1.userControllers.getUserById);
router.get('/:userId/orders/getOrders', users_controller_1.userControllers.getOrdersById);
router.put('/:userId/updateUsers', users_controller_1.userControllers.updateUserById);
router.put('/:userId/orders/updateOrders', users_controller_1.userControllers.updateUserByOrderId);
router.delete('/:userId/deleteUser', users_controller_1.userControllers.deleteUserById);
router.get('/:userId/orders/totalPrice', users_controller_1.userControllers.totalPrice);
exports.userRouter = router;
