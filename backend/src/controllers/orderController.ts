import {Request, Response} from 'express'
import mongoose from "mongoose";
import {BadRequestError} from "../errors/bad-request-error";
import {Order} from "../models/order";

export const fetchOrders = async (req: Request, res: Response) => {
    const orders = await Order.find({})
    return res.send(orders)
}

export const fetchUserOrders = async (req: Request, res: Response) => {
    const {user} = req
    const orders = await Order.find({customer: user.id}).sort('-createdAt')
    return res.send(orders)
}

export const addOrder = async (req: Request, res: Response) => {
    const {body, user} = req
    const {amount, items, address} = body
    if (!mongoose.Types.ObjectId.isValid(address)) throw new BadRequestError('An address is required')

    const order = Order.build({customer: user.id, address, amount, items})
    await order.save()

    return res.send(await Order.findById(order.id))
}

export const cancelOrder = async (req: Request, res: Response) => {

}