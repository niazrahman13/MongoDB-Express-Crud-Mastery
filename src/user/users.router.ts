import express from 'express';
import { userControllers } from './users.controller';

const router = express.Router()

router.post('/',userControllers.createUsers);

router.get('/',userControllers.getAllUsers);

router.get('/:userId',userControllers.getUserById)

router.get('/:userId/orders',userControllers.getOrdersById)//

router.put('/:userId',userControllers.updateUserById)

router.put('/:userId/orders',userControllers.updateUserByOrderId)//

router.delete('/:userId',userControllers.deleteUserById)

router.get('/:userId/orders/total-price',userControllers.totalPrice)//

export const userRouter = router;
