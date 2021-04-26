import {PAYMENT} from "../types"

const initialState = {
    loading: false,
    message: '',
    errors: []
}

const paymentReducer = (state = initialState, action) => {
    switch (action.type) {
        case PAYMENT.PAY_MPESA_REQUEST:
            return {
                ...state, loading: true
            }
        case PAYMENT.PAY_MPESA_SUCCESS:
            return {
                ...state, loading: false, message: action.payload, errors: []
            }
        case PAYMENT.PAY_MPESA_ERROR:
            return {
                ...state, loading: false, message: '', errors: action.payload
            }
        case PAYMENT.CLEAR_MPESA_ERRORS:
            return {
                ...state, loading: false, message: '', errors: []
            }
        default:
            return state
    }
}

export default paymentReducer
