import {UserRole} from "./constants";

export interface IPayload {
    id: string
    email: string
    role: UserRole
}

declare global {
    namespace Express {
        interface Request {
            user: IPayload
        }
    }
}