import {PAYPAL} from "../types";

const initialState = {
    loading: false,
    payment: {},
    errors: []
}

const paypalReducer = (state = initialState, action) => {
    switch (action.type) {
        case PAYPAL.MAKE_PAYMENT_REQUEST:
            return {
                ...state, loading: true
            }
        case PAYPAL.MAKE_PAYMENT_SUCCESS:
            return {
                ...state, loading: false, errors: [], payment: action.payload
            }
        case PAYPAL.MAKE_PAYMENT_ERROR:
            return {
                ...state, loading: false, errors: action.payload, payment: {}
            }
        case PAYPAL.CLEAR_PAYMENT_ERROR:
            return {
                ...state, errors: []
            }
        default:
            return state
    }
}

export default paypalReducer