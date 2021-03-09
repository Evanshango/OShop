import {ORDER} from "../types";

export const fetchOrdersRequest = () => {
    return {
        type: ORDER.FETCH_ORDERS_REQUEST
    }
}

export const fetchOrdersSuccess = orders => {
    return {
        type: ORDER.FETCH_ORDERS_SUCCESS,
        payload: orders
    }
}

export const fetchOrdersError = errors => {
    return {
        type: ORDER.FETCH_ORDERS_ERROR,
        payload: errors
    }
}

export const addOrderRequest = () => {
    return {
        type: ORDER.ADD_ORDER_REQUEST
    }
}

export const addOrderSuccess = order => {
    return {
        type: ORDER.ADD_ORDER_SUCCESS,
        payload: order
    }
}

export const addOrderError = errors => {
    return {
        type: ORDER.ADD_ORDER_ERROR,
        payload: errors
    }
}

export const clearOrderError = () => {
    return {
        type: ORDER.CLEAR_ORDER_ERRORS
    }
}