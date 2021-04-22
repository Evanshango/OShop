import {Request, Response} from "express";
import {TokenManager} from "../helpers/token-manager";
import gravatar from "gravatar";
import {User} from "../models/user";
import {BadRequestError} from "../errors/bad-request-error";
import {AUTH_METHOD, CLIENT_URL, GOOGLE_CLIENT_ID, JWT_SECRET} from "../helpers/constants";
import {PasswordManager} from "../helpers/password-manager";
import {OAuth2Client} from "google-auth-library";
import {EmailHandler} from "../helpers/email-handler";
import jwt from "jsonwebtoken";
import {IPayload} from "../helpers/types";

const userResponse = async (user: any, req: Request, res: Response, status: number) => {

    const userJWt = await TokenManager.generateToken(user)

    return res.status(status).json({
        status: 'success',
        token: userJWt
    })
}

const generateTokenAndSendEmail = async (user: any, res: Response) => {
    const expiration = new Date()
    expiration.setSeconds(expiration.getSeconds() + ((7 * 24) * 60 * 60))

    const activateToken = await TokenManager.generateToken(user)

    await User.findByIdAndUpdate(user.id, {activateToken, tokenExp: expiration})

    await EmailHandler.sendEmail(
        user.email,
        'ACCOUNT ACTIVATION',
        `<h3>Hello ${user.fullName},</h3> 
               <p>Thank you for creating an account with us, Just one more step...</p>
               <p> To activate your account please click on this link: <a target="_blank" 
                    href=${CLIENT_URL}/account/activate/${activateToken}>
                    <b style="color: red; text-decoration: underline; font-style: italic">Activation Link</b>
               </p>
               <p>Cheers,</p>`
    )
    return res.status(201).json({
        message: 'Check your email for an activation link. Kindly note that the link expires after 7 days'
    })
}

export const signupUser = async (req: Request, res: Response) => {
    const {firstName, lastName, email, password} = req.body
    const fullName = `${firstName} ${lastName}`
    const avatar = gravatar.url(email, {s: '200', r: 'pg', d: 'mm'}, true)

    const existingUser = await User.findOne({email})
    if (existingUser) {
        throw new BadRequestError('Email already in use')
    }

    const user = User.build({
        email, firstName, lastName, fullName, verified: false, method: AUTH_METHOD.LOCAL, password, avatar
    })
    await user.save()

    await generateTokenAndSendEmail(user, res)
}

export const signinUser = async (req: Request, res: Response) => {
    const {email, password} = req.body

    const existingUser = await User.findOne({email})
    if (!existingUser) throw new BadRequestError('Invalid credentials')

    if (!existingUser.verified) {
        throw new BadRequestError('Please check your email for an activation link')
    }

    if (!existingUser.password) throw new BadRequestError('Invalid credentials')

    const passMatch = await PasswordManager.compare(existingUser.password, password)
    if (!passMatch) throw new BadRequestError('Invalid credentials')

    await userResponse(existingUser, req, res, 200)
}

export const googleOAuth = async (req: Request, res: Response) => {
    const client = new OAuth2Client(GOOGLE_CLIENT_ID)
    const {idToken} = req.body
    if (!idToken) throw new BadRequestError('Request cancelled by user')
    // @ts-ignore
    const {payload} = await client.verifyIdToken({idToken, audience: GOOGLE_CLIENT_ID})

    const {email, name, given_name, family_name, picture, email_verified} = payload

    const existingUser = await User.findOne({email})
    if (existingUser) {
        if (existingUser.verified){
            await userResponse(existingUser, req, res, 200)
        } else {
            throw new BadRequestError('Please check your email for an activation link')
        }
    } else {
        const user = User.build({
            email, firstName: given_name, lastName: family_name, fullName: name, avatar: picture,
            verified: email_verified, method: AUTH_METHOD.GOOGLE
        })
        await user.save()
        await userResponse(user, req, res, 201)
    }
}

export const activationLink = async (req: Request, res: Response) => {
    const {email} = req.body
    const existing = await User.findOne({email})
    if (!existing) throw new BadRequestError('User with that email address does not exist')
    await generateTokenAndSendEmail(existing, res)
}

export const verifyAccount = async (req: Request, res: Response) => {
    const {token} = req.params
    let message
    try {
        const {id} = jwt.verify(token, JWT_SECRET!) as IPayload
        const user = await User.findById(id)
        const currDate = new Date()

        if (user!.tokenExp > currDate) {
            await User.findByIdAndUpdate(id, {$set: {verified: true}, $unset: {activateToken: '', tokenExp: ''}})
            message = 'Account activated successfully'
        } else {
            message = 'Activation token expired'
        }

        return res.send({message})
    } catch (err) {
        throw new BadRequestError('Invalid token')
    }
}

export const signoutUser = async (req: Request, res: Response) => {
    if (!req.session?.jwt) {
        return res.status(200).send({
            message: 'User not logged in'
        })
    } else {
        req.session = null

        res.status(200).send({
            status: 'success',
            message: 'User Signed out'
        })
    }
}
