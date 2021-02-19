import express from "express";
import {addProduct, deleteProduct, fetchProduct, fetchProducts, updateProduct} from "../controllers/productController";
import {requireAuth} from "../middlewares/require-auth";
import {isAdmin} from "../middlewares/is-admin";

const router = express.Router()

router.get('/products', fetchProducts)
router.post('/products', requireAuth, isAdmin, addProduct)
router.get('/products/:slug', fetchProduct)
router.patch('/products/:slug', requireAuth, isAdmin, updateProduct)
router.delete('/products/:slug', requireAuth, isAdmin, deleteProduct)

export {router as productRouter}