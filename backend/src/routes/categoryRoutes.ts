import express from "express";
import {requireAuth} from "../middlewares/require-auth";
import {body} from "express-validator";
import {validateRequest} from "../middlewares/validate-request";
import {
    addCategory, deleteCategory, fetchCategories, fetchCategory, updateCategory
} from "../controllers/categoryController";
import {isAdmin} from "../middlewares/is-admin";

const router = express.Router()

router.post('/categories', requireAuth, isAdmin, [
    body('name').notEmpty().trim().withMessage('Category name is required')
], validateRequest, addCategory)

router.get('/categories', fetchCategories)
router.get('/categories/:slug', fetchCategory)
router.patch('/categories/:slug', requireAuth, isAdmin, [
    body('name').not().isEmpty().trim().withMessage('Category name is required')
], validateRequest, updateCategory)
router.delete('/categories/:slug', requireAuth, isAdmin, deleteCategory)

export {router as categoryRouter}
