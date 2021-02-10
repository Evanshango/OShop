import express from "express";
import {requireAuth} from "../middlewares/require-auth";
import {body} from "express-validator";
import {validateRequest} from "../middlewares/validate-request";
import {
    addCategory, deleteCategory, fetchCategories, fetchCategory, updateCategory, visibleCategories
} from "../controllers/categoryController";
import {currentUser} from "../middlewares/current-user";

const router = express.Router()

router.post('/categories', requireAuth, [
    body('name').notEmpty().trim().withMessage('Category name is required')
], validateRequest, addCategory)

router.get('/categories/all', fetchCategories)
router.get('/categories', visibleCategories)
router.get('/categories/:slug', fetchCategory)
router.patch('/categories/:slug', currentUser, requireAuth, [
    body('name').not().isEmpty().trim().withMessage('Category name is required')
], validateRequest, updateCategory)
router.delete('/categories/:slug', currentUser, requireAuth, deleteCategory)

export {router as categoryRouter}
