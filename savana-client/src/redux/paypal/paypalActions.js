import {PAYPAL} from "../types";

export const makePaypalPayRequest = () => {
    return {
        type: PAYPAL.MAKE_PAYMENT_REQUEST
    }
}

export const makePaypalPaySuccess = pay => {
    return {
        type: PAYPAL.MAKE_PAYMENT_SUCCESS,
        payload: pay
    }
}

export const makePaypalPayError = errors => {
    return {
        type: PAYPAL.MAKE_PAYMENT_ERROR,
        payload: errors
    }
}

export const clearPaypalErrors = () => {
    return {
        type: PAYPAL.CLEAR_PAYMENT_ERROR
    }
}