import {Request, Response} from "express";
import {TokenManager} from "../helpers/token-manager";
import gravatar from "gravatar";
import {User} from "../models/user";
import {BadRequestError} from "../errors/bad-request-error";
import {AUTH_METHOD, CLIENT_URL_PROD, GOOGLE_CLIENT_ID} from "../helpers/constants";
import {PasswordManager} from "../helpers/password-manager";
import {OAuth2Client} from "google-auth-library";

const userResponse = async (user: any, req: Request, res: Response, status: number) => {

    const userJWt = await TokenManager.generateUserToken(user)

    return res.status(status).json({
        status: 'success',
        token: userJWt
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

    const url = `${CLIENT_URL_PROD!}/account/activate`

    const {message} = await TokenManager.generateTokenAndSendEmail(user, User, 'user', user.fullName, url)

    return res.status(201).json({
        message
    })
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
        if (existingUser.verified) {
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

    const url = `${CLIENT_URL_PROD}/account/activate`

    const {message} = await TokenManager.generateTokenAndSendEmail(existing, User, 'user', existing.fullName, url)

    return res.status(201).json({
        message
    })
}

export const verifyAccount = async (req: Request, res: Response) => {
    const {token} = req.params
    const message = await TokenManager.activateAccount(token, User)
    return res.send({message})
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
