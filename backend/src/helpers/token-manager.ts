import jwt from "jsonwebtoken";
import {JWT_SECRET} from "./constants";

export class TokenManager {
    static async generateToken(user: any) {
        return jwt.sign({id: user.id, email: user.email, role: user.role}, JWT_SECRET!)
    }
}