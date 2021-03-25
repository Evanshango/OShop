import {Request, Response} from "express";
import {TokenManager} from "../helpers/token-manager";
import gravatar from "gravatar";
import {User} from "../models/user";
import {BadRequestError} from "../errors/bad-request-error";
import {AUTH_METHOD, COOKIE_EXPIRES_IN, GOOGLE_CLIENT_ID, NODE_ENV} from "../helpers/constants";
import {PasswordManager} from "../helpers/password-manager";
import {OAuth2Client} from "google-auth-library";

const userResponse = async (user: any, req: Request, res: Response, status: number) => {

    const userJWt = await TokenManager.generateToken(user)

    // const cookieOptions = {
    //     expires: new Date(Date.now() + COOKIE_EXPIRES_IN! * 24 * 60 * 60 * 1000),
    //     httpOnly: true,
    //     secure: false,
    // }
    // if (NODE_ENV === 'production') cookieOptions.secure = true
    // res.cookie('oshop', userJWt, cookieOptions)

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
    await userResponse(user, req, res, 201)
}

export const signinUser = async (req: Request, res: Response) => {
    const {email, password} = req.body

    const existingUser = await User.findOne({email})
    if (!existingUser) throw new BadRequestError('Invalid credentials')

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
        await userResponse(existingUser, req, res, 200)
    } else {
        const user = User.build({
            email, firstName: given_name, lastName: family_name, fullName: name, avatar: picture,
            verified: email_verified, method: AUTH_METHOD.GOOGLE
        })
        await user.save()
        await userResponse(user, req, res, 201)
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