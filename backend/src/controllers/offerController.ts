import {Request, Response} from 'express'
import {Offer} from "../models/offer";
import mongoose from "mongoose";
import {BadRequestError} from "../errors/bad-request-error";
import {NotFoundError} from "../errors/not-found-error";

export const fetchOffers = async (req: Request, res: Response) => {
    const offers = await Offer.find({})
    return res.send(offers)
}

export const activeOffers = async (req: Request, res: Response) => {
    const currDate = new Date()
    const activeOffers = await Offer.find({expiresAt: {$gt: currDate}})

    const active = activeOffers.sort(() => Math.random() - Math.random()).slice(0, 3)

    return res.send(active)
}

export const addOffer = async (req: Request, res: Response) => {
    const {product, duration} = req.body
    if (!mongoose.Types.ObjectId.isValid(product)) throw new BadRequestError('Please choose a product')

    const expiration = new Date()
    //duration is in days ((duration * 24) * 60 * 60)
    expiration.setSeconds(expiration.getSeconds() + ((duration * 24) * 60 * 60))

    let savedOffer

    const existing = await Offer.findOne({product})
    if (existing) {
        savedOffer = await Offer.findByIdAndUpdate(existing._id, {expiresAt: expiration}, {
            new: true, runValidators: true
        })
    } else {
        const offer = Offer.build({
            product, expiresAt: expiration
        })
        await offer.save()
        savedOffer = await Offer.findById(offer.id)
    }
    return res.send(savedOffer)
}

export const deleteOffer = async (req: Request, res: Response) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) throw new BadRequestError('Invalid Offer ID')

    const offer = await Offer.findById(id)
    if (!offer) throw new NotFoundError('Offer')

    await Offer.findByIdAndDelete(id)
    return res.send(id)
}
