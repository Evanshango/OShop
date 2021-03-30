"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = void 0;
const not_authorized_error_1 = require("../errors/not-authorized-error");
const constants_1 = require("../helpers/constants");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bad_request_error_1 = require("../errors/bad-request-error");
const requireAuth = (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    if (!token)
        throw new not_authorized_error_1.NotAuthorizedError();
    try {
        req.user = jsonwebtoken_1.default.verify(token, constants_1.JWT_SECRET);
    }
    catch (err) {
        throw new bad_request_error_1.BadRequestError('An unidentified error occurred');
    }
    next();
};
exports.requireAuth = requireAuth;
