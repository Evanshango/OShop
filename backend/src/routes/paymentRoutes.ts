import express from "express";
import {requireAuth} from "../middlewares/require-auth";
import {validateRequest} from "../middlewares/validate-request";
import {body} from "express-validator";
import {addPayment, getPayments} from "../controllers/paymentController";
import {isAdmin} from "../middlewares/is-admin";

const router = express.Router()

router.get('/payments', requireAuth, isAdmin, getPayments)
router.post('/payments', [
    body('order').not().isEmpty().withMessage('Please provide an order id'),
], validateRequest, requireAuth, addPayment)

export {router as paymentRouter}