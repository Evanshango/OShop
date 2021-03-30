"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addressRouter = void 0;
const express_1 = __importDefault(require("express"));
const require_auth_1 = require("../middlewares/require-auth");
const validate_request_1 = require("../middlewares/validate-request");
const addressController_1 = require("../controllers/addressController");
const express_validator_1 = require("express-validator");
const router = express_1.default.Router();
exports.addressRouter = router;
router.get('/addresses', require_auth_1.requireAuth, addressController_1.fetchAddresses);
router.post('/addresses', [
    express_validator_1.body('phone').not().isEmpty().withMessage('Phone number is required'),
    express_validator_1.body('addressType').not().isEmpty().withMessage('Address type is required'),
    express_validator_1.body('state').not().isEmpty().withMessage('State is required'),
    express_validator_1.body('cityTown').not().isEmpty().withMessage('City or Town is required'),
    express_validator_1.body('postalCode').not().isEmpty().withMessage('Postal code is required'),
    express_validator_1.body('name').not().isEmpty().withMessage('Name is required')
], validate_request_1.validateRequest, require_auth_1.requireAuth, addressController_1.addAddress);
router.patch('/addresses/:id', require_auth_1.requireAuth, addressController_1.editAddress);
router.delete('/addresses/:id', require_auth_1.requireAuth, addressController_1.deleteAddress);
