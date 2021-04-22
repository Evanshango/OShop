import {ORDER} from "../types"

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

export const fetchLatestOrderRequest = () => {
    return {
        type: ORDER.FETCH_LATEST_ORDER_REQUEST
    }
}

export const fetchLatestOrderSuccess = order => {
    return {
        type: ORDER.FETCH_LATEST_ORDER_SUCCESS,
        payload: order
    }
}

export const fetchLatestOrderError = errors => {
    return {
        type: ORDER.FETCH_LATEST_ORDER_ERROR,
        payload: errors
    }
}

export const clearNewOrder = () => {
    return {
        type: ORDER.CLEAR_NEW_ORDER
    }
}
