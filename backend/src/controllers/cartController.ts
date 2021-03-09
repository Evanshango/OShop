import {Request, Response} from "express";
import {Cart} from "../models/cart";
import {NotFoundError} from "../errors/not-found-error";
import {NotAuthorizedError} from "../errors/not-authorized-error";
import mongoose from "mongoose";
import {BadRequestError} from "../errors/bad-request-error";

export const fetchCart = async (req: Request, res: Response) => {
    const {id} = req.user
    const cart = await Cart.find({customer: id})
    res.send(cart)
}

export const addToCart = async (req: Request, res: Response) => {
    const {id} = req.user
    const {product, units} = req.body
    const existingItem = await Cart.findOne({product, customer: id})
    let existing
    if (existingItem) {
        existing = await Cart.findByIdAndUpdate(existingItem.id, {units: existingItem.units + units}, {
            new: true,
        })
    } else {
        const cart = Cart.build({customer: id, product, units})
        await cart.save()

        existing = await Cart.findById(cart.id)
    }
    return res.send(existing)
}

export const updateCart = async (req: Request, res: Response) => {
    const {id} = req.user

    const existing = await Cart.findOne({customer: id, _id: req.params.id})
    if (!existing) throw new NotFoundError('Cart item not found')

    if (id !== existing.customer.id) throw new NotAuthorizedError()

    const update = await Cart.findByIdAndUpdate(existing.id, {units: req.body.units}, {
        new: true
    })
    return res.send(update)

}

export const deleteCart = async (req: Request, res: Response) => {
    const {id} = req.user

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) throw new BadRequestError('Invalid item ID')

    const existing = await Cart.findOne({customer: id, _id: req.params.id})
    if (!existing) throw new NotFoundError('Cart item not found')

    if (id !== existing.customer.id) throw new NotAuthorizedError()

    await Cart.findByIdAndDelete(existing.id)
    return res.status(204).send({
        message: 'Category deleted'
    })
}