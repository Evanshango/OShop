import {Request, Response} from "express";
import {User} from "../models/user";
import {NotFoundError} from "../errors/not-found-error";
import {NotAuthorizedError} from "../errors/not-authorized-error";


const checkUser = async (req: Request) => {
    const {id} = req.params
    const user = await User.findById(id);
    if (!user) throw new NotFoundError('User')
    return user
}

export const fetchUser = async (req: Request, res: Response) => {
    if (req.user) {
        const {id, email} = req.user!

        const user = await User.findOne({_id: id, email})
        if (!user) {
            throw new NotFoundError('User')
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

export const fetchUserById = async (req: Request, res: Response) => {
    const user = await checkUser(req)
    return res.send(user)
}

export const updateUser = async (req: Request, res: Response) => {
    const user = await checkUser(req)

    if (user.id !== req.user?.id) throw new NotAuthorizedError()

    const updatedUser = await User.findByIdAndUpdate(user.id, {...req.body}, {
        new: true,
        runValidators: true
    })
    return res.send(updatedUser)
}

export const deleteUser = async (req: Request, res: Response) => {
    const user = await checkUser(req)
    //todo implement user deletion
}