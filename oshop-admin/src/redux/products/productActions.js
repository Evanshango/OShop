import {PRODUCTS} from "../types";

export const productsRequest = () => {
    return {
        type: PRODUCTS.PRODUCTS_REQUEST
    }
}

export const productsSuccess = products => {
    return {
        type: PRODUCTS.PRODUCTS_SUCCESS,
        payload: products
    }
}

export const productsError = errors => {
    return {
        type: PRODUCTS.PRODUCTS_ERROR,
        payload: errors
    }
}

export const addProductRequest = () => {
    return {
        type: PRODUCTS.ADD_PRODUCT_REQUEST
    }
}

export const addProductSuccess = products => {
    return {
        type: PRODUCTS.ADD_PRODUCT_SUCCESS,
        payload: products
    }
}

export const addProductError = errors => {
    return {
        type: PRODUCTS.ADD_PRODUCT_ERROR,
        payload: errors
    }
}

export const deleteProductSuccess = id => {
    return{
        type: PRODUCTS.DELETE_PRODUCT_SUCCESS,
        payload: id
    }
}

export const deleteProductError = errors => {
    return{
        type: PRODUCTS.DELETE_PRODUCT_ERROR,
        payload: errors
    }
}

export const clearProductErrors = () => {
    return{
        type: PRODUCTS.CLEAR_PRODUCT_ERRORS
    }
}