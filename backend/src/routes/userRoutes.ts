import express from "express";
import {
    addOrganizationUser, deleteUser, fetchOrganizationUsers, fetchUser, fetchUserById, fetchUsers, updateUser
} from "../controllers/userController";
import {requireAuth} from "../middlewares/require-auth";
import {isAdmin} from "../middlewares/is-admin";
import {body} from "express-validator";
import {validateRequest} from "../middlewares/validate-request";

const router = express.Router()

router.get('/users', requireAuth, isAdmin, fetchUsers)
router.get('/users/current', requireAuth, fetchUser)

router.get('/users/organization', requireAuth, isAdmin, fetchOrganizationUsers)
router.post('/users/organization', [
    body('firstName').not().isEmpty().withMessage('User First Name is required'),
    body('lastName').not().isEmpty().withMessage('User Last Name is required'),
    body('email').not().isEmpty().withMessage('User Email is required'),
    body('role').not().isEmpty().withMessage('User role is required'),
], validateRequest, requireAuth, isAdmin, addOrganizationUser)

router.get('/users/:id', requireAuth, isAdmin, fetchUserById)
router.patch('/users/:id', requireAuth, updateUser)
router.delete('/users/:id', requireAuth, isAdmin, deleteUser)

export {router as userRouter}
