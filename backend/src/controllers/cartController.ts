import {Request, Response} from "express";
import {Cart} from "../models/cart";
import {NotFoundError} from "../errors/not-found-error";
import {NotAuthorizedError} from "../errors/not-authorized-error";
import mongoose from "mongoose";
import {BadRequestError} from "../errors/bad-request-error";

export const fetchCart = async (req: Request, res: Response) => {
    const {user} = req
    const cart = await Cart.findOne({customer: user.id})
    returnUserCart(cart, res)
}

const runUpdate = async (condition: any, updateData: any) => Cart.findOneAndUpdate(condition, updateData, {new: true});

const returnUserCart = (cart: any, res: Response) => {
    let cartItems: any = {}
    if (cart) {
        cart.items.forEach((item: any) => {
            const {units, product: {name, id, images, finalPrice}} = item
            cartItems[id] = {
                id, name, images, finalPrice, units
            }
        })
    }
    res.send(cartItems)
}

export const addToCart = async (req: Request, res: Response) => {
    const {user} = req
    const {items, sync} = req.body
    const existingItem = await Cart.findOne({customer: user.id})
    if (existingItem) {
        let promiseArray: any = []
        items.forEach((cartItem: any) => {
            const item = existingItem.items.find((ex: any) => ex.product.id === cartItem.id)
            let condition, update
            if (item) {
                condition = {customer: user.id, 'items.product': cartItem.id}
                update = {
                    $set: {
                        'items.$': {product: cartItem.id, units: !sync ? item.units + cartItem.units : item.units}
                    }
                }
            } else {
                condition = {customer: user.id}
                update = {
                    $push: {
                        items: {product: cartItem.id, units: cartItem.units}
                    }
                }
            }
            promiseArray.push(runUpdate(condition, update))
        })
        await Promise.all(promiseArray)
        returnUserCart(await Cart.findOne({customer: user.id}), res)
    } else {
        let itemArray: any = []
        items.map((item: any) => {
            const prod = {product: item.id, units: item.units}
            itemArray.push(prod)
        })
        const cart = Cart.build({
            customer: user.id,
            items: itemArray
        })
        const newItem = await cart.save()
        returnUserCart(await Cart.findById(newItem.id), res)
    }
}

export const deleteCart = async (req: Request, res: Response) => {
    const {user} = req

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) throw new BadRequestError('Invalid item ID')

    const existing = await Cart.findOne({customer: user.id})
    if (!existing) throw new NotFoundError('Cart item not found')

    if (user.id != existing.customer) throw new NotAuthorizedError()
    const itemsArray = existing.items

    const index = itemsArray.indexOf(existing.items.find((prod: any) => prod.product._id == req.params.id))
    if (index > -1) {
        itemsArray.splice(index, 1);
    }
    await Cart.findByIdAndUpdate(existing.id, {items: itemsArray}, {new: true})
    return res.send({id: req.params.id})
}