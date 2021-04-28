import {ORDERS} from "../types"

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

export const fetchOrderRequest = () => {
    return {
        type: ORDERS.FETCH_ORDER_REQUEST
    }
}

export const fetchOrderSuccess = order => {
    return {
        type: ORDERS.FETCH_ORDER_SUCCESS,
        payload: order
    }
}

export const fetchOrderError = errors => {
    return {
        type: ORDERS.FETCH_ORDER_ERROR,
        payload: errors
    }
}
