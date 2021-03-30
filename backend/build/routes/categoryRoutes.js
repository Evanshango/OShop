"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRouter = void 0;
const express_1 = __importDefault(require("express"));
const require_auth_1 = require("../middlewares/require-auth");
const express_validator_1 = require("express-validator");
const validate_request_1 = require("../middlewares/validate-request");
const categoryController_1 = require("../controllers/categoryController");
const is_admin_1 = require("../middlewares/is-admin");
const router = express_1.default.Router();
exports.categoryRouter = router;
router.post('/categories', require_auth_1.requireAuth, is_admin_1.isAdmin, [
    express_validator_1.body('name').notEmpty().trim().withMessage('Category name is required')
], validate_request_1.validateRequest, categoryController_1.addCategory);
router.get('/categories', categoryController_1.fetchCategories);
router.get('/categories/:id', categoryController_1.fetchCategory);
router.get('/categories/section/:sectionId', categoryController_1.fetchCategoriesBySectionId);
router.patch('/categories/:id', require_auth_1.requireAuth, is_admin_1.isAdmin, [
    express_validator_1.body('name').not().isEmpty().trim().withMessage('Category name is required')
], validate_request_1.validateRequest, categoryController_1.updateCategory);
router.delete('/categories/:id', require_auth_1.requireAuth, is_admin_1.isAdmin, categoryController_1.deleteCategory);
