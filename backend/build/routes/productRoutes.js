"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRouter = void 0;
const express_1 = __importDefault(require("express"));
const productController_1 = require("../controllers/productController");
const require_auth_1 = require("../middlewares/require-auth");
const is_admin_1 = require("../middlewares/is-admin");
const validate_request_1 = require("../middlewares/validate-request");
const express_validator_1 = require("express-validator");
const router = express_1.default.Router();
exports.productRouter = router;
router.get('/products', productController_1.fetchProducts);
router.post('/products', [
    express_validator_1.body('name').not().isEmpty().trim().withMessage('Product name is required'),
    express_validator_1.body('section').not().notEmpty().withMessage('Section is required'),
    express_validator_1.body('category').not().notEmpty().withMessage('Category is required'),
    express_validator_1.body('price').isFloat({ gt: 0 }).withMessage('Price must be greater than 0'),
    express_validator_1.body('stock').isFloat({ gt: 0 }).withMessage('Stock must be greater than 0'),
    express_validator_1.body('description').not().isEmpty().withMessage('Product description is required')
], validate_request_1.validateRequest, require_auth_1.requireAuth, is_admin_1.isAdmin, productController_1.addProduct);
router.get('/products/:id', productController_1.fetchProduct);
router.patch('/products/:id', [
    express_validator_1.body('section').not().isEmpty().withMessage('Section is required'),
    express_validator_1.body('category').not().isEmpty().withMessage('Category is required'),
], validate_request_1.validateRequest, require_auth_1.requireAuth, is_admin_1.isAdmin, productController_1.updateProduct);
router.delete('/products/:id', require_auth_1.requireAuth, is_admin_1.isAdmin, productController_1.deleteProduct);
