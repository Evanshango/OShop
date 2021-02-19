import express from "express";
import {googleOAuth, signinUser, signoutUser, signupUser} from "../controllers/authController";
import {body} from "express-validator";
import {validateRequest} from "../middlewares/validate-request";
import {requireAuth} from "../middlewares/require-auth";

const router = express.Router()

router.post('/auth/signup', [
    body('firstName').notEmpty().trim().withMessage('First name cannot be empty'),
    body('lastName').notEmpty().trim().withMessage('Last name cannot be empty'),
    body('email').notEmpty().trim().isEmail().withMessage('Email must be valid'),
    body('password').notEmpty().trim().isLength({min: 6, max: 20})
        .withMessage('Password must be between 6 and 20 characters')
], validateRequest, signupUser)

router.post('/auth/signin', [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().notEmpty().withMessage('You must supply a password')
], validateRequest, signinUser)

router.post('/auth/google', googleOAuth)
router.get('/auth/signout', requireAuth, signoutUser)

export {router as authRouter}