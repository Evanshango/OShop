"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signoutUser = exports.googleOAuth = exports.signinUser = exports.signupUser = void 0;
const token_manager_1 = require("../helpers/token-manager");
const gravatar_1 = __importDefault(require("gravatar"));
const user_1 = require("../models/user");
const bad_request_error_1 = require("../errors/bad-request-error");
const constants_1 = require("../helpers/constants");
const password_manager_1 = require("../helpers/password-manager");
const google_auth_library_1 = require("google-auth-library");
const userResponse = (user, req, res, status) => __awaiter(void 0, void 0, void 0, function* () {
    const userJWt = yield token_manager_1.TokenManager.generateToken(user);
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
    });
});
const signupUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, email, password } = req.body;
    const fullName = `${firstName} ${lastName}`;
    const avatar = gravatar_1.default.url(email, { s: '200', r: 'pg', d: 'mm' }, true);
    const existingUser = yield user_1.User.findOne({ email });
    if (existingUser) {
        throw new bad_request_error_1.BadRequestError('Email already in use');
    }
    const user = user_1.User.build({
        email, firstName, lastName, fullName, verified: false, method: constants_1.AUTH_METHOD.LOCAL, password, avatar
    });
    yield user.save();
    yield userResponse(user, req, res, 201);
});
exports.signupUser = signupUser;
const signinUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const existingUser = yield user_1.User.findOne({ email });
    if (!existingUser)
        throw new bad_request_error_1.BadRequestError('Invalid credentials');
    if (!existingUser.password)
        throw new bad_request_error_1.BadRequestError('Invalid credentials');
    const passMatch = yield password_manager_1.PasswordManager.compare(existingUser.password, password);
    if (!passMatch)
        throw new bad_request_error_1.BadRequestError('Invalid credentials');
    yield userResponse(existingUser, req, res, 200);
});
exports.signinUser = signinUser;
const googleOAuth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const client = new google_auth_library_1.OAuth2Client(constants_1.GOOGLE_CLIENT_ID);
    const { idToken } = req.body;
    if (!idToken)
        throw new bad_request_error_1.BadRequestError('Request cancelled by user');
    // @ts-ignore
    const { payload } = yield client.verifyIdToken({ idToken, audience: constants_1.GOOGLE_CLIENT_ID });
    const { email, name, given_name, family_name, picture, email_verified } = payload;
    const existingUser = yield user_1.User.findOne({ email });
    if (existingUser) {
        yield userResponse(existingUser, req, res, 200);
    }
    else {
        const user = user_1.User.build({
            email, firstName: given_name, lastName: family_name, fullName: name, avatar: picture,
            verified: email_verified, method: constants_1.AUTH_METHOD.GOOGLE
        });
        yield user.save();
        yield userResponse(user, req, res, 201);
    }
});
exports.googleOAuth = googleOAuth;
const signoutUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (!((_a = req.session) === null || _a === void 0 ? void 0 : _a.jwt)) {
        return res.status(200).send({
            message: 'User not logged in'
        });
    }
    else {
        req.session = null;
        res.status(200).send({
            status: 'success',
            message: 'User Signed out'
        });
    }
});
exports.signoutUser = signoutUser;
