import {PRODUCT} from "../types";

const initialState = {
    loading: false,
    product: {},
    similar: [],
    errors: []
}

const productItemReducer = (state = initialState, action) => {
    switch (action.type) {
        case PRODUCT.FETCH_PRODUCT_REQUEST:
            return {
                ...state, loading: true
            }
        case PRODUCT.FETCH_PRODUCT_SUCCESS:
            return {
                ...state, loading: false, errors: [], product: action.payload.product, similar: action.payload.similar
            }
        case PRODUCT.FETCH_PRODUCT_ERROR:
            return {
                ...state, loading: false, errors: action.payload, product: {}
            }
        case PRODUCT.CLEAR_PRODUCT_ERROR:
            return {
                ...state, errors: []
            }
        default:
            return state
    }
}

export default productItemReducer
