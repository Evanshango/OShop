import express from "express";
import {requireAuth} from "../middlewares/require-auth";
import {addToCart, deleteCart, fetchCart, updateCart} from "../controllers/cartController";
import {validateRequest} from "../middlewares/validate-request";
import {body} from "express-validator";

const router = express.Router()

router.get('/cart', requireAuth, fetchCart)
router.post('/cart', [
    body('product').not().isEmpty().withMessage('Product is required'),
    body('units').not().isEmpty().withMessage('Item units is required'),
], validateRequest, requireAuth, addToCart)
router.patch('/cart/:id', requireAuth, updateCart)
router.delete('/cart/:id', requireAuth, deleteCart)

export {router as cartRouter}