import express from "express";
import {deleteUser, fetchUser, fetchUserById, fetchUsers, updateUser} from "../controllers/userController";
import {currentUser} from "../middlewares/current-user";

const router = express.Router()

router.get('/users', currentUser, fetchUsers)
router.get('/users/current', currentUser, fetchUser)
router.get('/users/:id', fetchUserById)
router.patch('/users/:id', currentUser, updateUser)
router.delete('/users/:id', currentUser, deleteUser)


export {router as userRouter}