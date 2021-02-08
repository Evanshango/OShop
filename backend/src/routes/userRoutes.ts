import {fetchUser, fetchUsers} from "../controllers/userController";
import express from "express";
import {currentUser} from "../middlewares/current-user";

const router = express.Router()

router.get('/users', currentUser, fetchUsers)
router.get('/users/current', currentUser, fetchUser)

export {router as userRouter}