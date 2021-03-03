import {NextFunction, Request, Response} from 'express'
import {NotAuthorizedError} from '../errors/not-authorized-error'
import {JWT_SECRET, UserRole} from "../helpers/constants";
import jwt from "jsonwebtoken";
import {BadRequestError} from "../errors/bad-request-error";
import {IPayload} from "../helpers/types";

// interface IPayload {
//     id: string
//     email: string
//     role: UserRole
// }
//
// declare global {
//     namespace Express {
//         interface Request {
//             user: IPayload
//         }
//     }
// }

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]
    }
    // if (req.headers.cookie) {
    //     token = req.headers.cookie.split('=')[1]
    // }
    if (!token) throw new NotAuthorizedError()

    try {
        req.user = jwt.verify(token, JWT_SECRET!) as IPayload
    } catch (err) {
        throw new BadRequestError('An unidentified error occurred')
    }
    next()
}
