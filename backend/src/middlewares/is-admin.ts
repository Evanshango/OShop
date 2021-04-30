import {NextFunction, Request, Response} from "express";
import {USER_ROLE} from "../helpers/constants";
import {NotAuthorizedError} from "../errors/not-authorized-error";

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    const adminRoles = [USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN]
    if (!adminRoles.includes(req.user!.role)) {
        throw new NotAuthorizedError()
    }
    next()
}
