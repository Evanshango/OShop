import {PRODUCTS} from "../types";

export const fetchProductsRequest = () => {
    return {
        type: PRODUCTS.FETCH_PRODUCTS_REQUEST
    }
}

export const fetchProductsSuccess = products => {
    return {
        type: PRODUCTS.FETCH_PRODUCTS_SUCCESS,
        payload: products
    }
}

export const fetchProductsError = errors => {
    return {
        type: PRODUCTS.FETCH_PRODUCTS_ERROR,
        payload: errors
    }
}

export const clearProductErrors = () => {
    return {
        type: PRODUCTS.CLEAR_PRODUCT_ERRORS
    }
}