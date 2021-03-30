"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartRouter = void 0;
const express_1 = __importDefault(require("express"));
const require_auth_1 = require("../middlewares/require-auth");
const cartController_1 = require("../controllers/cartController");
const validate_request_1 = require("../middlewares/validate-request");
const express_validator_1 = require("express-validator");
const router = express_1.default.Router();
exports.cartRouter = router;
router.get('/cart', require_auth_1.requireAuth, cartController_1.fetchCart);
router.post('/cart', [
    express_validator_1.body('items.*.id').not().isEmpty().withMessage('Product is required'),
    express_validator_1.body('items.*.units').not().isEmpty().withMessage('Item units is required'),
], validate_request_1.validateRequest, require_auth_1.requireAuth, cartController_1.addToCart);
router.delete('/cart/:id', require_auth_1.requireAuth, cartController_1.deleteCart);
