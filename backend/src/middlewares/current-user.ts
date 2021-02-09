import {NextFunction, Request, Response} from 'express'
import jwt from 'jsonwebtoken'
import {UserRole, JWT_SECRET} from "../helpers/constants";

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

export const currentUser = (req: Request, res: Response, next: NextFunction) => {
    if (!req.session?.jwt) return next()

    try {
        req.user = jwt.verify(req.session.jwt, JWT_SECRET!) as IPayload
    } catch (err) {}
    next()
}
