import {MPESA_CONSUMER_KEY, MPESA_CONSUMER_SECRET, MPESA_SANDBOX_URL} from "../helpers/constants";
import axios from "axios";
import {BadRequestError} from "../errors/bad-request-error";
import {NextFunction, Request, Response} from "express";

export const mPesaAccessToken = async (req: Request, res: Response, next: NextFunction) => {
    let url = MPESA_SANDBOX_URL!
    const consumerPassKey = `${MPESA_CONSUMER_KEY!}:${MPESA_CONSUMER_SECRET}`
    let auth = Buffer.alloc(consumerPassKey.length, consumerPassKey).toString('base64')
    try {
        const {data} = await axios.get(url, {
            headers: {
                'Authorization': `Basic ${auth}`
            }
        })
        req.mPesaToken = data.access_token
    } catch (err) {
        console.log(err)
        throw new BadRequestError('Unable to access mpesa services right now. Please try again later')
    }
    next()
}
