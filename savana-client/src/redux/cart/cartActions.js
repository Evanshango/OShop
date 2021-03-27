import {CART} from "../types";

export const fetchCartRequest = () => {
    return {
        type: CART.FETCH_CART_REQUEST
    }
}

export const fetchCartSuccess = item => {
    return {
        type: CART.FETCH_CART_SUCCESS,
        payload: item
    }
}

export const fetchCartError = errors => {
    return {
        type: CART.FETCH_CART_ERROR,
        payload: errors
    }
}

export const addToCartRequest = () => {
    return {
        type: CART.ADD_ITEM_TO_CART_REQUEST
    }
}

export const addToCartSuccess = products => {
    return {
        type: CART.ADD_ITEM_TO_CART_SUCCESS,
        payload: products
    }
}

export const addToCartError = errors => {
    return {
        type: CART.ADD_ITEM_TO_CART_ERROR,
        payload: errors
    }
}

export const updateCartRequest = () => {
    return {
        type: CART.UPDATE_CART_UNITS_REQUEST
    }
}

export const updateCartSuccess = product => {
    return {
        type: CART.UPDATE_CART_UNITS_SUCCESS,
        payload: product
    }
}

export const updateCartError = errors => {
    return {
        type: CART.UPDATE_CART_UNITS_ERROR,
        payload: errors
    }
}

export const deleteCartRequest = () => {
    return {
        type: CART.DELETE_CART_ITEM_REQUEST
    }
}

export const deleteCartSuccess = id => {
    return {
        type: CART.DELETE_CART_ITEM_SUCCESS,
        payload: id
    }
}

export const deleteCartError = errors => {
    return {
        type: CART.DELETE_CART_ITEM_ERROR,
        payload: errors
    }
}

export const clearCartError = () => {
    return {
        type: CART.CLEAR_CART_ERRORS
    }
}

export const clearCartItems = () => {
    return{
        type: CART.CLEAR_CART_ITEMS
    }
}
