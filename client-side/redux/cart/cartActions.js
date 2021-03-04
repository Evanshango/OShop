import {CART} from "../types";

export const fetchCartItems = products => {
    return{
        type: CART.FETCH_CART_ITEMS,
        payload: products
    }
}

export const addToCart = product => {
    return {
        type: CART.ADD_ITEM_TO_CART,
        payload: product
    }
}

export const updateCartItem = product => {
    return {
        type: CART.UPDATE_CART_UNITS,
        payload: product
    }
}

export const removeCartItem = id => {
    return {
        type: CART.DELETE_CART_ITEM,
        payload: id
    }
}
