import express from "express";
import {body} from "express-validator";
import {validateRequest} from '../middlewares/validate-request'
import {requireAuth} from "../middlewares/require-auth";
import {
    activateOrganization, addOrganization, getOrganizations, requestLink, signInOrg
} from "../controllers/organizationController";
import {isAdmin} from "../middlewares/is-admin";

const router = express.Router()

router.get('/organizations', getOrganizations)
router.get('/organizations/activate/:token', activateOrganization)
router.post('/organizations', [
    body('name').not().isEmpty().trim().withMessage('Organization name is required'),
    body('email').not().isEmpty().trim().withMessage('Organization email is required'),
    body('password').not().isEmpty().trim().withMessage('Organization password is email'),
], validateRequest, requireAuth, isAdmin, addOrganization)
router.post('/organizations/signin', [
    body('email').not().isEmpty().trim().withMessage('Organization email is required'),
    body('password').not().isEmpty().trim().withMessage('Organization password is required')
], validateRequest, signInOrg)
router.post('/organization/request/link', [
    body('email').not().isEmpty().trim().withMessage('Organization email is required')
], validateRequest, requestLink)

export {router as organizationRouter}
