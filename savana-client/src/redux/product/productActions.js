import {PRODUCT} from "../types";

export const fetchProductRequest = () => {
    return{
        type: PRODUCT.FETCH_PRODUCT_REQUEST
    }
}

export const fetchProductSuccess = product => {
    return {
        type: PRODUCT.FETCH_PRODUCT_SUCCESS,
        payload: product
    }
}

export const fetchProductError = errors => {
    return{
        type: PRODUCT.FETCH_PRODUCT_ERROR,
        payload: errors
    }
}

export const clearProductErrors = () => {
    return{
        type: PRODUCT.CLEAR_PRODUCT_ERROR
    }
}