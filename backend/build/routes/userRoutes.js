"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const require_auth_1 = require("../middlewares/require-auth");
const is_admin_1 = require("../middlewares/is-admin");
const router = express_1.default.Router();
exports.userRouter = router;
router.get('/users', require_auth_1.requireAuth, is_admin_1.isAdmin, userController_1.fetchUsers);
router.get('/users/current', require_auth_1.requireAuth, userController_1.fetchUser);
router.get('/users/:id', require_auth_1.requireAuth, is_admin_1.isAdmin, userController_1.fetchUserById);
router.patch('/users/:id', require_auth_1.requireAuth, userController_1.updateUser);
router.delete('/users/:id', require_auth_1.requireAuth, is_admin_1.isAdmin, userController_1.deleteUser);
