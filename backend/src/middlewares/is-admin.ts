import {NextFunction, Request, Response} from "express";
import {UserRole} from "../helpers/constants";
import {NotAuthorizedError} from "../errors/not-authorized-error";

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    if (req.user!.role !== UserRole.ADMIN) {
        throw new NotAuthorizedError()
    }
    next()
}