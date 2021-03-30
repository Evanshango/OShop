"use strict";
// import passport from 'passport'
// import {AuthMethod, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET} from './constants'
// import {User} from "../models/user";
// import {Profile, Strategy} from "passport-google-oauth20";
//
// const passportAuth = (passport: any) => passport.use('google', new Strategy({
//     clientID: GOOGLE_CLIENT_ID!,
//     clientSecret: GOOGLE_CLIENT_SECRET!,
//     callbackURL: 'http://localhost:5000/api/v1/auth/google'
// }, async (accessToken: string, refreshToken: string, profile: Profile, next: any) => {
//     const {_json: {name, given_name, family_name, picture, email, email_verified}} = profile
//
//     try {
//         let user = await User.findOne({email})
//         if (user) {
//             next(null, user)
//         } else {
//             const user = User.build({
//                 email, firstName: given_name, lastName: family_name, fullName: name, avatar: picture,
//                 verified: email_verified, method: AuthMethod.GOOGLE,
//             })
//             await user.save()
//             next(null, user)
//         }
//     } catch (err) {
//         next(err, false)
//     }
// }))
//
// passport.serializeUser(async (user: any, next: any) => next(null, user))
//
// passport.deserializeUser(async (user: any, next: any) => {
//     User.findOne({email: user.email}, (err: Error, user: any) => next(err, user))
// })
//
// export {passportAuth}
