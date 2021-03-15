import {Request, Response} from 'express'
import {Address} from "../models/address";

export const fetchAddresses = async (req: Request, res: Response) => {
    const {user} = req
    const addresses = await Address.find({user: user.id})
    return res.send(addresses)
}

export const addAddress = async (req: Request, res: Response) => {
    const {user, body} = req
    const {phone, addressType, state, cityTown, postalCode, name} = body
    const address = Address.build({
        phone, addressType, state, cityTown, postalCode, name, user: user.id
    })
    await address.save()
    const newAddress = await Address.findById(address.id)
    return res.send(newAddress)
}

export const editAddress = async (req: Request, res: Response) => {
    return res.send({})
}

export const deleteAddress = async (req: Request, res: Response) => {
    return res.send({})
}