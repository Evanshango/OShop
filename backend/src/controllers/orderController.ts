import {Request, Response} from 'express'
import mongoose from "mongoose";
import {BadRequestError} from "../errors/bad-request-error";
import {Order} from "../models/order";
import {Cart} from "../models/cart";

export const fetchOrders = async (req: Request, res: Response) => {
    const orders = await Order.find({})
    return res.send(orders)
}

export const fetchUserOrders = async (req: Request, res: Response) => {
    const {user} = req
    const orders = await Order.find({customer: user.id})
    return res.send(orders)
}

export const addOrder = async (req: Request, res: Response) => {
    const {body, user} = req
    const {amount, items, address, paymentMethod, paymentStatus} = body
    if (!mongoose.Types.ObjectId.isValid(address)) throw new BadRequestError('An address is required')

    const order = Order.build({customer: user.id, address, amount, items, paymentMethod, paymentStatus})
    await order.save()

    const toDelete = await Cart.findOne({customer: user.id})

    await Cart.findByIdAndDelete(toDelete.id)

    return res.send(await Order.findById(order.id))
}

export const updateOrder = async (req: Request, res: Response) => {

}

export const cancelOrder = async (req: Request, res: Response) => {

}