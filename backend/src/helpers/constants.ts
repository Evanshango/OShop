import dotenv from "dotenv";

dotenv.config()

export const JWT_SECRET = process.env.JWT_SECRET
export const GOOGLE_CLIENT_ID = process.env.CLIENT_ID
export const GOOGLE_CLIENT_SECRET = process.env.CLIENT_SECRET
export const MONGO_URI = process.env.MONGO_URI
export const DB_USER = process.env.MONGO_USER
export const DB_PASSWORD = process.env.MONGO_PASSWORD
export const DB_NAME = process.env.MONGO_DB_NAME
export const PORT = process.env.PORT
export const NODE_ENV = process.env.NODE_ENV
export const COOKIE_EXPIRES_IN = parseInt(process.env.COOKIE_EXPIRES_IN!)

export const ORIGIN_1 = process.env.ORIGIN_1
export const ORIGIN_2 = process.env.ORIGIN_2
export const ORIGIN_3 = process.env.ORIGIN_3
export const ORIGIN_4 = process.env.ORIGIN_4

export const S3_ENDPOINT = process.env.S3_ENDPOINT
export const AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY
export const AWS_SECRET_KEY = process.env.AWS_SECRET_KEY
export const BUCKET_NAME = process.env.BUCKET_NAME

export const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID
export const PAYPAL_SECRET = process.env.PAYPAL_SECRET
export const PAYPAL_API_SANDBOX = process.env.PAYPAL_API_SANDBOX
export const PAYPAL_API_LIVE = process.env.PAYPAL_API_LIVE
export const PAYPAL_CURRENCY_CODE = process.env.PAYPAL_CURRENCY_CODE

export enum AUTH_METHOD {
    GOOGLE = 'GOOGLE',
    LOCAL = 'LOCAL'
}

export enum USER_ROLE {
    USER = 'USER',
    ADMIN = 'ADMIN',
    VENDOR = 'VENDOR'
}

export enum PAYMENT_STATUS {
    PENDING = 'PENDING',
    COMPLETED = 'COMPLETED',
}

export enum PAYMENT_METHOD {
    CASH = 'CASH',
    MPESA = 'MPESA',
    VISA = 'VISA',
    PAYPAL = 'PAYPAL'
}

export enum ORDER_STATUS {
    ORDERED = 'ORDERED',
    SHIPPED = 'SHIPPED',
    DELIVERED = 'DELIVERED'
}

export enum ADDRESS_TYPE {
    HOME = 'HOME',
    WORK = 'WORK'
}
