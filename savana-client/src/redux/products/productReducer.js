import {PRODUCTS} from "../types";

const initialState = {
    loading: false,
    products: [],
    count: null,
    page: null,
    pages: null,
    errors: []
}

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case PRODUCTS.FETCH_PRODUCTS_REQUEST:
            return {
                ...state, loading: true
            }
        case PRODUCTS.FETCH_PRODUCTS_SUCCESS:
            const {products, count, page, pages} = action.payload
            return {
                ...state, loading: false, products: products, count, page, pages, errors: []
            }
        case PRODUCTS.FETCH_PRODUCTS_ERROR:
            return {
                ...state, errors: action.payload, loading: false, products: [], count: null, page: null, pages: null
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