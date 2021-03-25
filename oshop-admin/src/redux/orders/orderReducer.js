import {ORDERS} from "../types";

const initialState = {
    loading: false,
    orders: [],
    errors: []
}

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case ORDERS.ORDERS_REQUEST:
            return {
                ...state, loading: true
            }
        case ORDERS.ORDERS_SUCCESS:
            return {
                ...state, loading: false, orders: action.payload, errors: []
            }
        case ORDERS.ORDERS_ERROR:
            return {
                ...state, loading: false, errors: action.payload, orders: []
            }
        case ORDERS.CLEAR_ORDER_ERRORS:
            return {
                ...state, errors: []
            }
        default:
            return state
    }
}

export default orderReducer