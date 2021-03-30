"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRouter = void 0;
const express_1 = __importDefault(require("express"));
const orderController_1 = require("../controllers/orderController");
const require_auth_1 = require("../middlewares/require-auth");
const validate_request_1 = require("../middlewares/validate-request");
const express_validator_1 = require("express-validator");
const router = express_1.default.Router();
exports.orderRouter = router;
router.get('/orders', require_auth_1.requireAuth, orderController_1.fetchOrders);
router.get('/orders/user', require_auth_1.requireAuth, orderController_1.fetchUserOrders);
router.post('/orders', [
    express_validator_1.body('address').not().isEmpty().withMessage('Please add an address'),
    express_validator_1.body('amount').not().isEmpty().withMessage('Total order amount is required'),
    express_validator_1.body('paymentMethod').not().isEmpty().withMessage('Please choose a payment method'),
    express_validator_1.body('paymentStatus').not().isEmpty().withMessage('Payment status required')
], validate_request_1.validateRequest, require_auth_1.requireAuth, orderController_1.addOrder);
router.patch('/orders/:id', require_auth_1.requireAuth, orderController_1.updateOrder);
router.delete('/orders/:id', require_auth_1.requireAuth, orderController_1.cancelOrder);
