import {Request, Response} from 'express'
import {Payment} from "../models/payment";
import axios from "axios";
import {
    CALL_BACK_URL_PROD,
    MPESA_PASS_KEY,
    MPESA_SHORT_CODE,
    MPESA_STK_PUSH, NODE_ENV,
    PAYMENT_METHOD,
    RANDOM_ID
} from "../helpers/constants";
import {BadRequestError} from "../errors/bad-request-error";

declare const Buffer: any

const padDate = (n: any) => n < 10 ? `0${n}` : n

export const getPayments = async (req: Request, res: Response) => {
    const payments = await Payment.find({})
    return res.send(payments)
}

export const addPayment = async (req: Request, res: Response) => {

    const {order, paymentRef, payerEmail, payerId, payerName, amount, currency, method} = req.body

    const randomId = RANDOM_ID(new Date())

    const toSave = Payment.build({
        order, orderRandomId: randomId, paymentRef, payerName, amount, currency, method, payerEmail, payerId
    })

    const payment = await toSave.save()

    return res.send(await Payment.findById(payment.id))
}

export const mpesaPayment = async (req: Request, res: Response) => {
    const {mPesaToken} = req
    const {phone, amount, orderId, randomId} = req.body

    const callbackURL = NODE_ENV! !== 'development' ? CALL_BACK_URL_PROD! : 'https://818d40e2bda8.ngrok.io/api/v1/payments/stk/callback'
    // const callbackURL = CALL_BACK_URL_PROD!

    let dateNow = new Date()
    const year = dateNow.getFullYear()
    const month = padDate(dateNow.getMonth() + 1)
    const date = padDate(dateNow.getDate())
    const hours = padDate(dateNow.getHours())
    const minutes = padDate(dateNow.getMinutes())
    const seconds = padDate(dateNow.getSeconds())
    const timestamp = `${year}${month}${date}${hours}${minutes}${seconds}`
    const shortCodePassKey = `${MPESA_SHORT_CODE!}${MPESA_PASS_KEY}${timestamp}`
    const password = Buffer.alloc(shortCodePassKey.length, shortCodePassKey).toString('base64')

    let message

    const params = {
        "BusinessShortCode": MPESA_SHORT_CODE!,
        "Password": password,
        "Timestamp": timestamp,
        "TransactionType": "CustomerPayBillOnline",
        "Amount": amount,
        "PartyA": phone,
        "PartyB": MPESA_SHORT_CODE!,
        "PhoneNumber": phone,
        "CallBackURL": callbackURL,
        "AccountReference": "Savana Treasures",
        "Remarks": orderId,
        "TransactionDesc": orderId,
    }

    try {
        const {data} = await axios.post(MPESA_STK_PUSH!, params, {
            headers: {'Authorization': `Bearer ${mPesaToken}`}
        })

        message = data.ResponseCode === 0 ? data.CustomerMessage : data.CustomerMessage

        const payment = Payment.build({
            order: orderId, orderRandomId: randomId, amount, currency: 'KSH', method: PAYMENT_METHOD.MPESA,
            checkoutId: data.CheckoutRequestID, merchantId: data.MerchantRequestID
        })

        await payment.save()

        return res.send({
            message
        })
    } catch (err) {
        console.log(err)
        throw new BadRequestError('Please try again after sometime')
    }
}

export const stkCallback = async (req: Request, res: Response) => {
    const {Body} = req.body
    let message, checkoutId, merchantId, result
    if (Body) {
        switch (Body.stkCallback.ResultCode) {
            case 0:
                message = Body.stkCallback.ResultDesc
                checkoutId = Body.stkCallback.CheckoutRequestID
                merchantId = Body.stkCallback.MerchantRequestID
                const resArray = Body.stkCallback.CallbackMetadata.Item

                result = resArray.reduce(function (r: any, e: any) {
                    r[e.Name] = e.Value;
                    return r;
                }, {});
                const payment = await Payment.findOne({checkoutId, merchantId})

                if (!payment) throw new BadRequestError('Payment not found')

                await Payment.findByIdAndUpdate(payment.id, {
                    message, paymentRef: result.MpesaReceiptNumber
                })

                const {order} = payment

                await Payment.deleteOrderCart(order, PAYMENT_METHOD.MPESA)

                break
            case 1037:
                message = Body.stkCallback.ResultDesc
                break
            default:
                message = 'Unable to process transaction request'
        }
    } else {
        throw new BadRequestError('Something went wrong')
    }
    return res.send({message})
}

export const confirmMpesaPayment = async (req: Request, res: Response) => {
    const {orderId} = req.body
}
