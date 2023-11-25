import express from 'express';
import { userControllers } from './users.controller';

const router = express.Router()

router.post('/createUsers',userControllers.createUsers);

router.get('/getUsers',userControllers.getAllUsers);

router.get('/:userId/getUsers',userControllers.getUserById)

router.get('/:userId/orders/getOrders',userControllers.getOrdersById)

router.put('/:userId/updateUsers',userControllers.updateUserById)

router.put('/:userId/orders/updateOrders',userControllers.updateUserByOrderId)

router.delete('/:userId/deleteUser',userControllers.deleteUserById)

router.get('/:userId/orders/totalPrice',userControllers.totalPrice)

export const userRouter = router;
