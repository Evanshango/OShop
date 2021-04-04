import express from "express";
import {requireAuth} from "../middlewares/require-auth";
import {validateRequest} from "../middlewares/validate-request";
import {body} from "express-validator";
import {addSettings, fetchSettings} from "../controllers/settingController";
import {isAdmin} from "../middlewares/is-admin";

const router = express.Router()

router.get('/settings', fetchSettings)
router.post('/settings', [
    body('email').not().isEmpty().withMessage('Contact email is required'),
    body('phone').not().isEmpty().withMessage('Contact phone is required'),
    body('address').not().isEmpty().withMessage('Contact address is required')
], validateRequest, requireAuth, isAdmin, addSettings)

export {router as settingRouter}