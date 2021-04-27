import express from "express";
import {requireAuth} from "../middlewares/require-auth";
import {validateRequest} from "../middlewares/validate-request";
import {body} from "express-validator";
import {
    addPayment, confirmMpesaPayment, getPayments, mpesaPayment, stkCallback, validateMpesaPayment
} from "../controllers/paymentController";
import {isAdmin} from "../middlewares/is-admin";
import {mPesaAccessToken} from "../middlewares/mpesa-handler";

const router = express.Router()

router.get('/payments', requireAuth, isAdmin, getPayments)
router.post('/payments/m', [
    body('phone').not().isEmpty().withMessage('Please provide a valid phone number'),
    body('amount').not().isEmpty().withMessage('Please provide an amount')
], validateRequest, mPesaAccessToken, mpesaPayment)
router.post('/payments', [
    body('order').not().isEmpty().withMessage('Please provide an order id'),
], validateRequest, requireAuth, addPayment)

router.post('/payments/stk/callback', stkCallback)
router.post('/payments/validation', validateMpesaPayment)
router.post('/payments/confirmation', confirmMpesaPayment)

export {router as paymentRouter}
