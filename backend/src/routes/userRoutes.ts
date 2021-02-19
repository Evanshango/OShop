import express from "express";
import {deleteUser, fetchUser, fetchUserById, fetchUsers, updateUser} from "../controllers/userController";
import {requireAuth} from "../middlewares/require-auth";
import {isAdmin} from "../middlewares/is-admin";

const router = express.Router()

router.get('/users', requireAuth, isAdmin, fetchUsers)
router.get('/users/current', requireAuth, isAdmin, fetchUser)
router.get('/users/:id', requireAuth, isAdmin, fetchUserById)
router.patch('/users/:id', requireAuth, updateUser)
router.delete('/users/:id', requireAuth, isAdmin, deleteUser)


export {router as userRouter}