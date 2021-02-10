import express from "express";
import {addProduct, fetchProducts} from "../controllers/productController";
import {currentUser} from "../middlewares/current-user";
import {requireAuth} from "../middlewares/require-auth";

const router = express.Router()

router.get('/products', fetchProducts)
router.post('/products', currentUser, requireAuth, addProduct)

export {router as productRouter}