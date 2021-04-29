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

export const ORIGIN_1 = process.env.ORIGIN_1
export const ORIGIN_2 = process.env.ORIGIN_2
export const ORIGIN_3 = process.env.ORIGIN_3
export const ORIGIN_4 = process.env.ORIGIN_4

export const S3_ENDPOINT = process.env.S3_ENDPOINT
export const AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY
export const AWS_SECRET_KEY = process.env.AWS_SECRET_KEY
export const BUCKET_NAME = process.env.BUCKET_NAME

export const ZOHO_USER = process.env.ZOHO_USER
export const ZOHO_PASS = process.env.ZOHO_PASS

export const CLIENT_URL = process.env.CLIENT_URL
export const CLIENT_URL_PROD = process.env.CLIENT_URL_PROD
export const CLIENT_ADMIN_URL_PROD = process.env.CLIENT_ADMIN_URL_PROD

export const MPESA_CONSUMER_KEY = process.env.MPESA_CONSUMER_KEY
export const MPESA_CONSUMER_SECRET = process.env.MPESA_CONSUMER_SECRET
export const MPESA_SANDBOX_URL = process.env.MPESA_SANDBOX_URL
export const MPESA_STK_PUSH = process.env.MPESA_STK_PUSH
export const MPESA_C2B_URL = process.env.MPESA_C2B_URL
export const MPESA_SHORT_CODE = process.env.MPESA_SHORT_CODE
export const MPESA_PASS_KEY = process.env.MPESA_PASS_KEY
export const MPESA_RC_NO = process.env.MPESA_RC_NO
export const CALL_BACK_URL_PROD = process.env.CALL_BACK_URL_PROD

export enum AUTH_METHOD {
    GOOGLE = 'GOOGLE',
    LOCAL = 'LOCAL'
}

export enum USER_ROLE {
    SUPER_ADMIN = 'SUPER_ADMIN',
    USER = 'USER',
    ADMIN = 'ADMIN',
    VENDOR = 'VENDOR'
}

export enum PAYMENT_STATUS {
    PENDING = 'PENDING',
    COMPLETED = 'COMPLETED',
}

export enum PAYMENT_METHOD {
    MPESA = 'MPESA',
    // VISA = 'VISA',
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

export enum PRODUCT_STATUS {
    ACTIVE = 'ACTIVE',
    DELETED = 'DELETED'
}
