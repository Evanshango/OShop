import {Request, Response} from 'express'
import {Payment} from "../models/payment";

export const getPayments = async (req: Request, res: Response) => {
    const payments = await Payment.find({})
    return res.send(payments)
}

export const addPayment = async (req: Request, res: Response) => {

    const {order, paymentRef, payerEmail, payerId, payerName, amount, currency, method} = req.body

    const toSave = Payment.build({order, paymentRef, payerName, amount, currency, method, payerEmail, payerId})

    const payment = await toSave.save()

    return res.send(await Payment.findById(payment.id))
}