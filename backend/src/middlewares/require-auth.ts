import {NextFunction, Request, Response} from 'express'
import {NotAuthorizedError} from '../errors/not-authorized-error'
import {JWT_SECRET, UserRole} from "../helpers/constants";
import jwt from "jsonwebtoken";

interface IPayload {
    id: string
    email: string
    role: UserRole
}

declare global {
    namespace Express {
        interface Request {
            user?: IPayload
        }
    }
}

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    if (!req.session?.jwt) throw new NotAuthorizedError()

    try {
        req.user = jwt.verify(req.session.jwt, JWT_SECRET!) as IPayload
    } catch (err) {}
    next()
}
