import express from "express";
import {addProduct, deleteProduct, fetchProduct, fetchProducts, updateProduct} from "../controllers/productController";
import {requireAuth} from "../middlewares/require-auth";
import {isAdmin} from "../middlewares/is-admin";
import {validateRequest} from "../middlewares/validate-request";
import {body} from "express-validator";

const router = express.Router()

router.get('/products', fetchProducts)
router.post('/products',[
    body('name').not().isEmpty().trim().withMessage('Product name is required'),
    body('section').not().notEmpty().withMessage('Section is required'),
    body('category').not().notEmpty().withMessage('Category is required'),
    body('price').isFloat({gt: 0}).withMessage('Price must be greater than 0'),
    body('stock').isFloat({gt: 0}).withMessage('Stock must be greater than 0'),
    body('description').not().isEmpty().withMessage('Product description is required')
], validateRequest, requireAuth, isAdmin, addProduct)
router.get('/products/:id', fetchProduct)
router.patch('/products/:id', requireAuth, isAdmin, updateProduct)
router.delete('/products/:id', requireAuth, isAdmin, deleteProduct)

export {router as productRouter}