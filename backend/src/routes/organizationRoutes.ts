import express from "express";
import {body} from "express-validator";
import {validateRequest} from '../middlewares/validate-request'
import {requireAuth} from "../middlewares/require-auth";
import {addOrganization, getOrganizations} from "../controllers/organizationController";
import {isAdmin} from "../middlewares/is-admin";

const router = express.Router()

router.get('/organizations', getOrganizations)
router.post('/organizations', [
    body('name').not().isEmpty().trim().withMessage('Organization name is required'),
    body('email').not().isEmpty().trim().withMessage('Organization email is email')
], validateRequest, requireAuth, isAdmin, addOrganization)

export {router as organizationRouter}
