"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sectionRouter = void 0;
const express_1 = __importDefault(require("express"));
const sectionController_1 = require("../controllers/sectionController");
const express_validator_1 = require("express-validator");
const validate_request_1 = require("../middlewares/validate-request");
const require_auth_1 = require("../middlewares/require-auth");
const is_admin_1 = require("../middlewares/is-admin");
const router = express_1.default.Router();
exports.sectionRouter = router;
router.post('/sections', require_auth_1.requireAuth, is_admin_1.isAdmin, [
    express_validator_1.body('name').notEmpty().trim().withMessage('Section name is required')
], validate_request_1.validateRequest, sectionController_1.addSection);
router.get('/sections', sectionController_1.fetchSections);
router.patch('/sections/:id', require_auth_1.requireAuth, is_admin_1.isAdmin, [
    express_validator_1.body('name').notEmpty().trim().withMessage('Section name is required')
], sectionController_1.updateSection);
router.delete('/sections/:id', require_auth_1.requireAuth, is_admin_1.isAdmin, sectionController_1.deleteSection);
