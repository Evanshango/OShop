import {Request, Response} from 'express'
import mongoose from "mongoose";
import {BadRequestError} from "../errors/bad-request-error";
import {Order} from "../models/order";
import {PAYMENT_STATUS} from "../helpers/constants";

export const fetchOrders = async (req: Request, res: Response) => {
    const orders = await Order.find({})
    return res.send(orders)
}

export const fetchUserLatestOrder = async (req: Request, res: Response) => {
    const {id} = req.user
    let foundOrder = {}
    const order = await Order.find({
        customer: id, paymentStatus: PAYMENT_STATUS.PENDING
    }).sort('-createdAt').limit(1)
    if (order.length > 0){
        foundOrder = order[0]
    } else {
        foundOrder = {}
    }
    return res.send(foundOrder)
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
