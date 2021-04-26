import {Request, Response} from 'express'
import {Payment} from "../models/payment";
import axios from "axios";
import {MPESA_PASS_KEY, MPESA_SHORT_CODE, MPESA_STK_PUSH} from "../helpers/constants";
import {BadRequestError} from "../errors/bad-request-error";

declare const Buffer: any

const padDate = (n: any) => n < 10 ? `0${n}` : n

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

export const mpesaPayment = async (req: Request, res: Response) => {
    const {mPesaToken} = req
    const {phone, amount, orderId} = req.body

    console.log('TOKEN', mPesaToken)

    // const callbackURL = NODE_ENV! !== 'development' ? CALL_BACK_URL_PROD! : 'https://adff75d7bf0f.ngrok.io/api/v1/payments/stk/callback'

    let dateNow = new Date()
    const year = dateNow.getFullYear()
    const month = padDate(dateNow.getMonth() + 1)
    const date = dateNow.getDate()
    const hours = dateNow.getHours()
    const minutes = dateNow.getMinutes()
    const seconds = dateNow.getSeconds()
    const timestamp = `${year}${month}${date}${hours}${minutes}${seconds}`
    const password = new Buffer.from(`${MPESA_SHORT_CODE!}${MPESA_PASS_KEY!}${timestamp}`).toString('base64')

    let message

    const params = {
        "BusinessShortCode": MPESA_SHORT_CODE!,
        "Password": password,
        "Timestamp": timestamp,
        "TransactionType": "CustomerPayBillOnline",
        "Amount": 1, //TODO change value to an actual amount value from the request body
        "PartyA": phone,
        "PartyB": MPESA_SHORT_CODE!,
        "PhoneNumber": phone,
        "CallBackURL": 'https://adff75d7bf0f.ngrok.io/api/v1/payments/stk/callback',
        "AccountReference": "Savana Treasures",
        "TransactionDesc": orderId,
    }

    try {
        const {data} = await axios.post(MPESA_STK_PUSH!, params, {
            headers: {'Authorization': `Bearer ${mPesaToken}`}
        })

        message = data.ResponseCode === 0 ? data.CustomerMessage : data.CustomerMessage

        console.log(data)

        return res.send({
            message
        })
    } catch ({response}) {
        console.log(response)
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

    console.log({checkoutId, message, merchantId, result})

    return res.send({
        checkoutId, message, merchantId, result
    })
}

export const validateMpesaPayment = async (req: Request, res: Response) => {
    console.log(req)
}

export const confirmMpesaPayment = async (req: Request, res: Response) => {
    console.log(req.body)
}
