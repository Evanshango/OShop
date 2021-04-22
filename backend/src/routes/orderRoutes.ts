import express from "express";
import {
    addOrder, cancelOrder, fetchOrders, fetchUserLatestOrder, fetchUserOrders
} from "../controllers/orderController";
import {requireAuth} from "../middlewares/require-auth";
import {validateRequest} from "../middlewares/validate-request";
import {body} from "express-validator";

const router = express.Router()

router.get('/orders', requireAuth, fetchOrders)
router.get('/orders/user', requireAuth, fetchUserOrders)
router.get('/orders/latest', requireAuth, fetchUserLatestOrder)
router.post('/orders', [
    body('address').not().isEmpty().withMessage('Please add an address'),
    body('amount').not().isEmpty().withMessage('Total order amount is required'),
], validateRequest, requireAuth, addOrder)

router.delete('/orders/:id', requireAuth, cancelOrder)

export {router as orderRouter}
