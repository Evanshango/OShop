import express from "express";
import {addSection, deleteSection, fetchSections, updateSection} from "../controllers/sectionController";
import {body} from "express-validator";
import {validateRequest} from "../middlewares/validate-request";
import {requireAuth} from "../middlewares/require-auth";
import {isAdmin} from "../middlewares/is-admin";

const router = express.Router()

router.post('/sections', requireAuth, isAdmin, [
    body('name').notEmpty().trim().withMessage('Section name is required')
], validateRequest, addSection)
router.get('/sections', fetchSections)
router.patch('/sections/:slug', requireAuth, isAdmin, [
    body('name').notEmpty().trim().withMessage('Section name is required')
], updateSection)
router.delete('/sections/:slug', requireAuth, isAdmin, deleteSection)

export {router as sectionRouter}