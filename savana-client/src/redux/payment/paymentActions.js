import {PAYMENT} from "../types"

export const payMpesaRequest = () => {
    return {
        type: PAYMENT.PAY_MPESA_REQUEST
    }
}

export const payMpesaSuccess = message => {
    return {
        type: PAYMENT.PAY_MPESA_SUCCESS,
        payload: message
    }
}

export const payMpesaError = errors => {
    return {
        type: PAYMENT.PAY_MPESA_ERROR,
        payload: errors
    }
}

export const clearMpesaError = () => {
    return {
        type: PAYMENT.CLEAR_MPESA_ERRORS
    }
}
