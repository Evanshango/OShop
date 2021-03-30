"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const express_validator_1 = require("express-validator");
const validate_request_1 = require("../middlewares/validate-request");
const require_auth_1 = require("../middlewares/require-auth");
const router = express_1.default.Router();
exports.authRouter = router;
router.post('/auth/signup', [
    express_validator_1.body('firstName').notEmpty().trim().withMessage('First name cannot be empty'),
    express_validator_1.body('lastName').notEmpty().trim().withMessage('Last name cannot be empty'),
    express_validator_1.body('email').notEmpty().trim().isEmail().withMessage('Email must be valid'),
    express_validator_1.body('password').notEmpty().trim().isLength({ min: 6, max: 20 })
        .withMessage('Password must be between 6 and 20 characters')
], validate_request_1.validateRequest, authController_1.signupUser);
router.post('/auth/signin', [
    express_validator_1.body('email').isEmail().withMessage('Email must be valid'),
    express_validator_1.body('password').trim().notEmpty().withMessage('You must supply a password')
], validate_request_1.validateRequest, authController_1.signinUser);
router.post('/auth/google', authController_1.googleOAuth);
router.get('/auth/signout', require_auth_1.requireAuth, authController_1.signoutUser);
