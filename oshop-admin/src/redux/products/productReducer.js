import {PRODUCTS} from "../types";

const initialState = {
    loading: false,
    products: [],
    errors: []
}

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case PRODUCTS.PRODUCTS_REQUEST:
            return {
                ...state, loading: true
            }
        case PRODUCTS.PRODUCTS_SUCCESS:
            return {
                ...state, products: action.payload, errors: [], loading: false
            }
        case PRODUCTS.PRODUCTS_ERROR:
            return {
                ...state, products: [], errors: action.payload, loading: false
            }
        case PRODUCTS.ADD_PRODUCT_REQUEST:
            return {
                ...state, loading: true
            }
        case PRODUCTS.ADD_PRODUCT_SUCCESS:
            return {
                ...state, products: [...state.products, action.payload], loading: false, errors: []
            }
        case PRODUCTS.ADD_PRODUCT_ERROR:
            return {
                ...state, errors: action.payload, loading: false
            }
        case PRODUCTS.EDIT_PRODUCT_REQUEST:
            return {
                ...state, loading: true
            }
        case PRODUCTS.EDIT_PRODUCT_SUCCESS:
            let index = state.products.findIndex(prod => prod.id === action.payload.id)
            state.products[index] = action.payload
            return {
                ...state, loading: false, errors: []
            }
        case PRODUCTS.DELETE_PRODUCT_SUCCESS:
            return {
                ...state, products: state.products.filter(product => product.id !== action.payload), errors: []
            }
        case PRODUCTS.DELETE_PRODUCT_ERROR:
            return {
                ...state, errors: action.payload
            }
        case PRODUCTS.CLEAR_PRODUCT_ERRORS:
            return {
                ...state, errors: []
            }
        default:
            return state
    }
}

export default productReducer