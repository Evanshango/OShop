import {CART} from "../types";

const initialState = {
    products: {},
    loading: false,
    errors: []
}

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case CART.FETCH_CART_REQUEST:
            return {
                ...state, loading: true
            }
        case CART.FETCH_CART_SUCCESS:
            updateLocalStorage(action.payload)
            return {
                ...state, products: action.payload, loading: false, errors: []
            }
        case CART.FETCH_CART_ERROR:
            return {
                ...state, loading: false, products: {}, errors: action.payload
            }
        case CART.ADD_ITEM_TO_CART_REQUEST:
            return {
                ...state, loading: true
            }
        case CART.ADD_ITEM_TO_CART_SUCCESS:
            const {products} = state
            const item = action.payload
            const qty = products[item.id] ? parseInt(products[item.id].units + item.units) : 1
            products[item.id] = {
                ...item, units: qty
            }
            updateLocalStorage(products)
            return {
                ...state, errors: [], loading: false, products
            }
        case CART.ADD_ITEM_TO_CART_ERROR:
            return {
                ...state, loading: false, errors: action.payload, products: {}
            }
        case CART.CLEAR_CART_ERRORS:
            return {
                ...state, errors: []
            }
        default:
            return state
    }
}

const updateLocalStorage = products => {
    localStorage.setItem('oshopCart', JSON.stringify(products))
}

export default cartReducer