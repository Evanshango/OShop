import jwt from "jsonwebtoken";
import {JWT_SECRET} from "./constants";
import {Model} from "mongoose";
import {EmailHandler} from "./email-handler";
import {BadRequestError} from "../errors/bad-request-error";
import {IPayload} from "./types";

export class TokenManager {
    static async generateUserToken(user: any) {
        return jwt.sign({id: user.id, email: user.email, role: user.role, name: user.fullName}, JWT_SECRET!)
    }

    static async generateOrgToken(org: any) {
        return jwt.sign({id: org.id, email: org.email, name: org.name}, JWT_SECRET!)
    }

    static async generateTokenAndSendEmail(user: any, model: Model<any>, tag: string, name: string, url: string) {
        const expiration = new Date()
        expiration.setSeconds(expiration.getSeconds() + ((7 * 24) * 60 * 60))

        const tk = tag === 'user' ? await TokenManager.generateUserToken(user) : await TokenManager.generateOrgToken(user)

        await model.findByIdAndUpdate(user.id, {activateToken: tk, tokenExp: expiration})

        await EmailHandler.sendEmail(user.email, 'ACCOUNT ACTIVATION', `
           <h3>Hello ${name},</h3> 
           <p>Thank you for creating an account with us, Just one more step...</p>
           <p> To activate your account please click on this link: 
           <a target="_blank" href='${url}/${tk}'>
                <b style="color: red; text-decoration: underline; font-style: italic">Activation Link</b>
            </a>
           </p>
           <p>Cheers,</p>
        `)

        return {
            message: 'Check your email for an activation link. Kindly note that the link expires after 7 days'
        }
    }

    static async activateAccount(token: string, model: Model<any>) {
        try {
            const {id} = jwt.verify(token, JWT_SECRET!) as IPayload
            const doc = await model.findById(id)

            const currDate = new Date()
            let message: any

            if (doc!.tokenExp > currDate) {
                await model.findByIdAndUpdate(id, {$set: {verified: true}, $unset: {activateToken: '', tokenExp: ''}})
                message = 'Account activated successfully'
            } else {
                message = 'Activation token expired'
            }
            return message
        } catch (err) {
            throw new BadRequestError('Invalid token')
        }
    }
}
