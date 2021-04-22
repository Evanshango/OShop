// noinspection TypeScriptValidateJSTypes

import {MPESA_CONSUMER_KEY, MPESA_CONSUMER_SECRET, MPESA_SANDBOX_URL} from "../helpers/constants";
import axios from "axios";
import {BadRequestError} from "../errors/bad-request-error";
import {NextFunction, Request, Response} from "express";

declare const Buffer: any

export const mPesaAccessToken = async (req: Request, res: Response, next: NextFunction) => {
    let url = MPESA_SANDBOX_URL!
    let auth = new Buffer.from(`${MPESA_CONSUMER_KEY!}:${MPESA_CONSUMER_SECRET!}`).toString('base64')
    try {
        const {data} = await axios.get(url, {
            headers: {
                'Authorization': `Basic ${auth}`
            }
        })
        req.mPesaToken = data.access_token
    } catch (err) {
        throw new BadRequestError('Unable to access mpesa services right now. Please try again later')
    }
    next()
}
