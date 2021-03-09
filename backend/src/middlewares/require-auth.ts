import {NextFunction, Request, Response} from 'express'
import {NotAuthorizedError} from '../errors/not-authorized-error'
import {JWT_SECRET} from "../helpers/constants";
import jwt from "jsonwebtoken";
import {BadRequestError} from "../errors/bad-request-error";
import {IPayload} from "../helpers/types";

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]
    }
    if (!token) throw new NotAuthorizedError()

    try {
        req.user = jwt.verify(token, JWT_SECRET!) as IPayload
    } catch (err) {
        throw new BadRequestError('An unidentified error occurred')
    }
    next()
}
