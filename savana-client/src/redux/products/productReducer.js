import {PRODUCTS} from "../types";

const initialState = {
    loading: false,
    products: [],
    errors: []
}

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case PRODUCTS.FETCH_PRODUCTS_REQUEST:
            return {
                ...state, loading: true
            }
        case PRODUCTS.FETCH_PRODUCTS_SUCCESS:
            return {
                ...state, loading: false, products: action.payload, errors: []
            }
        case PRODUCTS.FETCH_PRODUCTS_ERROR:
            return {
                ...state, errors: action.payload, loading: false, products: []
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