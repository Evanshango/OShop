"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.offerRouter = void 0;
const express_1 = __importDefault(require("express"));
const require_auth_1 = require("../middlewares/require-auth");
const validate_request_1 = require("../middlewares/validate-request");
const offerController_1 = require("../controllers/offerController");
const express_validator_1 = require("express-validator");
const is_admin_1 = require("../middlewares/is-admin");
const router = express_1.default.Router();
exports.offerRouter = router;
router.get('/offers', offerController_1.fetchOffers);
router.get('/offers/active', offerController_1.activeOffers);
router.post('/offers', [
    express_validator_1.body('product').not().isEmpty().withMessage('Please choose a product'),
    express_validator_1.body('duration').not().isEmpty().withMessage('Please specify offer duration')
], validate_request_1.validateRequest, require_auth_1.requireAuth, is_admin_1.isAdmin, offerController_1.addOffer);
router.delete('/offers/:id', require_auth_1.requireAuth, is_admin_1.isAdmin, offerController_1.deleteOffer);
