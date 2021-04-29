import {NextFunction, Request, Response} from "express";
import {USER_ROLE} from "../helpers/constants";
import {NotAuthorizedError} from "../errors/not-authorized-error";

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    if (req.user!.role !== USER_ROLE.SUPER_ADMIN) {
        throw new NotAuthorizedError()
    }
    next()
}
