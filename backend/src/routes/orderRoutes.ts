import express from "express";
import {addOrder, cancelOrder, fetchOrders, updateOrder} from "../controllers/orderController";
import {requireAuth} from "../middlewares/require-auth";
import {validateRequest} from "../middlewares/validate-request";
import {body} from "express-validator";

const router = express.Router()

router.get('/orders', requireAuth, fetchOrders)
router.post('/orders', [
    body('customer').not().isEmpty().withMessage('Please signin to proceed'),
    body('address').not().isEmpty().withMessage('Please add an address'),
    body('phone').not().isEmpty().withMessage('Please enter your phone number'),
    body('paymentMethod').not().isEmpty().withMessage('Please choose a payment method'),
    body('paymentStatus').not().isEmpty().withMessage('Payment status required')
], validateRequest, requireAuth, addOrder)

router.patch('/orders/:id', requireAuth, updateOrder)
router.delete('/orders/:id', requireAuth, cancelOrder)

export {router as orderRouter}