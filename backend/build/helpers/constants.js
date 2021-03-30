"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ADDRESS_TYPE = exports.ORDER_STATUS = exports.PAYMENT_METHOD = exports.PAYMENT_STATUS = exports.USER_ROLE = exports.AUTH_METHOD = exports.BUCKET_NAME = exports.AWS_SECRET_KEY = exports.AWS_ACCESS_KEY = exports.S3_ENDPOINT = exports.ORIGIN_2 = exports.ORIGIN_1 = exports.COOKIE_EXPIRES_IN = exports.NODE_ENV = exports.PORT = exports.DB_NAME = exports.DB_PASSWORD = exports.DB_USER = exports.MONGO_URI = exports.GOOGLE_CLIENT_SECRET = exports.GOOGLE_CLIENT_ID = exports.JWT_SECRET = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.JWT_SECRET = process.env.JWT_SECRET;
exports.GOOGLE_CLIENT_ID = process.env.CLIENT_ID;
exports.GOOGLE_CLIENT_SECRET = process.env.CLIENT_SECRET;
exports.MONGO_URI = process.env.MONGO_URI;
exports.DB_USER = process.env.MONGO_USER;
exports.DB_PASSWORD = process.env.MONGO_PASSWORD;
exports.DB_NAME = process.env.MONGO_DB_NAME;
exports.PORT = process.env.PORT;
exports.NODE_ENV = process.env.NODE_ENV;
exports.COOKIE_EXPIRES_IN = parseInt(process.env.COOKIE_EXPIRES_IN);
exports.ORIGIN_1 = process.env.ORIGIN_1;
exports.ORIGIN_2 = process.env.ORIGIN_2;
exports.S3_ENDPOINT = process.env.S3_ENDPOINT;
exports.AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
exports.AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;
exports.BUCKET_NAME = process.env.BUCKET_NAME;
var AUTH_METHOD;
(function (AUTH_METHOD) {
    AUTH_METHOD["GOOGLE"] = "GOOGLE";
    AUTH_METHOD["LOCAL"] = "LOCAL";
})(AUTH_METHOD = exports.AUTH_METHOD || (exports.AUTH_METHOD = {}));
var USER_ROLE;
(function (USER_ROLE) {
    USER_ROLE["USER"] = "USER";
    USER_ROLE["ADMIN"] = "ADMIN";
    USER_ROLE["VENDOR"] = "VENDOR";
})(USER_ROLE = exports.USER_ROLE || (exports.USER_ROLE = {}));
var PAYMENT_STATUS;
(function (PAYMENT_STATUS) {
    PAYMENT_STATUS["PENDING"] = "PENDING";
    PAYMENT_STATUS["COMPLETED"] = "COMPLETED";
})(PAYMENT_STATUS = exports.PAYMENT_STATUS || (exports.PAYMENT_STATUS = {}));
var PAYMENT_METHOD;
(function (PAYMENT_METHOD) {
    PAYMENT_METHOD["CASH"] = "CASH";
    PAYMENT_METHOD["MPESA"] = "MPESA";
    PAYMENT_METHOD["VISA"] = "VISA";
})(PAYMENT_METHOD = exports.PAYMENT_METHOD || (exports.PAYMENT_METHOD = {}));
var ORDER_STATUS;
(function (ORDER_STATUS) {
    ORDER_STATUS["ORDERED"] = "ORDERED";
    ORDER_STATUS["SHIPPED"] = "SHIPPED";
    ORDER_STATUS["DELIVERED"] = "DELIVERED";
})(ORDER_STATUS = exports.ORDER_STATUS || (exports.ORDER_STATUS = {}));
var ADDRESS_TYPE;
(function (ADDRESS_TYPE) {
    ADDRESS_TYPE["HOME"] = "HOME";
    ADDRESS_TYPE["WORK"] = "WORK";
})(ADDRESS_TYPE = exports.ADDRESS_TYPE || (exports.ADDRESS_TYPE = {}));
