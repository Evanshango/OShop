import {Request, Response} from 'express'
import mongoose from "mongoose";
import {BadRequestError} from "../errors/bad-request-error";
import {Order} from "../models/order";
import {PAYMENT_STATUS, RANDOM_ID} from "../helpers/constants";
import {NotFoundError} from "../errors/not-found-error";

export const fetchOrders = async (req: Request, res: Response) => {
    const orders = await Order.find({})
    return res.send(orders)
}

export const fetchOrder = async (req: Request, res: Response) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) throw new BadRequestError('Invalid orderID')
    const order = await Order.findById(id)
    if (!order) {
        throw new NotFoundError('Order')
    }
    return res.send(order)
}

export const fetchUserLatestOrder = async (req: Request, res: Response) => {
    const {id} = req.user
    let foundOrder
    const order = await Order.find({
        customer: id, paymentStatus: PAYMENT_STATUS.PENDING
    }).sort('-createdAt').limit(1)
    if (order.length > 0) {
        foundOrder = order[0]
    } else {
        foundOrder = {}
    }
    return res.send(foundOrder)
}

export const fetchUserOrders = async (req: Request, res: Response) => {
    const {user} = req
    const orders = await Order.find({
        customer: user.id, paymentStatus: PAYMENT_STATUS.COMPLETED
    }).sort('-createdAt')
    return res.send(orders)
}

export const addOrder = async (req: Request, res: Response) => {
    const {body, user} = req
    const {amount, items, address} = body
    if (!mongoose.Types.ObjectId.isValid(address)) throw new BadRequestError('An address is required')

    const randomId = RANDOM_ID(new Date())

    const order = Order.build({randomId, customer: user.id, address, amount, items})
    await order.save()

    return res.send(await Order.findById(order.id))
}

export const cancelOrder = async (req: Request, res: Response) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) throw new BadRequestError('Invalid orderID')

    const order = await Order.findById(id)

    if (!order) throw new NotFoundError('Order')

    await Order.findByIdAndDelete(order.id)

    return res.send(id)
}
