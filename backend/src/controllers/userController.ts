import {Request, Response} from "express";
import {User} from "../models/user";
import {NotFoundError} from "../errors/not-found-error";
import {NotAuthorizedError} from "../errors/not-authorized-error";

export const fetchUser = async (req: Request, res: Response) => {
    if (req.user) {
        const {id, email} = req.user

        const user = await User.findOne({_id: id, email})
        if (!user) {
            throw new NotFoundError()
        }
        return res.send(user)
    } else {
        throw new NotAuthorizedError()
    }
}

export const fetchUsers = async (req: Request, res: Response) => {
    const users = await User.find({})
    return res.send(users)

}