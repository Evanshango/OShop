import {ORDERS} from "../types";

export const fetchOrdersRequest = () => {
    return {
        type: ORDERS.ORDERS_REQUEST
    }
}

export const fetchOrdersSuccess = orders => {
    return {
        type: ORDERS.ORDERS_SUCCESS,
        payload: orders
    }
}

export const fetchOrdersError = errors => {
    return {
        type: ORDERS.ORDERS_ERROR,
        payload: errors
    }
}

export const clearOrderErrors = () => {
    return {
        type: ORDERS.CLEAR_ORDER_ERRORS
    }
}