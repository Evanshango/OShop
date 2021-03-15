import dotenv from "dotenv";

dotenv.config()

export const JWT_SECRET = process.env.JWT_SECRET
export const GOOGLE_CLIENT_ID = process.env.CLIENT_ID
export const GOOGLE_CLIENT_SECRET = process.env.CLIENT_SECRET
export const MONGO_URI = process.env.MONGO_URI
export const PORT = process.env.PORT
export const NODE_ENV = process.env.NODE_ENV
export const COOKIE_EXPIRES_IN = parseInt(process.env.COOKIE_EXPIRES_IN!)

export const S3_ENDPOINT = process.env.S3_ENDPOINT
export const AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY
export const AWS_SECRET_KEY = process.env.AWS_SECRET_KEY
export const BUCKET_NAME = process.env.BUCKET_NAME

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
    VISA = 'VISA'
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
