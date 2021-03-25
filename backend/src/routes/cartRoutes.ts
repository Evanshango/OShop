import express from "express";
import {requireAuth} from "../middlewares/require-auth";
import {addToCart, deleteCart, fetchCart} from "../controllers/cartController";
import {validateRequest} from "../middlewares/validate-request";
import {body} from "express-validator";

const router = express.Router()

router.get('/cart', requireAuth, fetchCart)
router.post('/cart',[
    body('items.*.id').not().isEmpty().withMessage('Product is required'),
    body('items.*.units').not().isEmpty().withMessage('Item units is required'),
], validateRequest, requireAuth, addToCart)

router.delete('/cart/:id', requireAuth, deleteCart)

export {router as cartRouter}