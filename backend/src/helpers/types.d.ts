import {USER_ROLE} from "./constants";

export interface IPayload {
    id: string
    email: string
    role: USER_ROLE
}

export interface IAccessToken {
    mpesaAccessToken: string
}

declare global {
    namespace Express {
        interface Request {
            user: IPayload
            mPesaToken: IAccessToken
        }
    }
}
