import {CART} from "../types";

const initialState = {
    loading: false,
    products: [],
    errors: []
}

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case CART.FETCH_CART_REQUEST:
            return {
                ...state, loading: true
            }
        case CART.FETCH_CART_SUCCESS:
            return {
                ...state, products: action.payload, loading: false
            }
        case CART.FETCH_CART_ERROR:
            return {
                ...state, errors: action.payload, loading: false, products: []
            }
        case CART.ADD_ITEM_TO_CART_REQUEST:
            return {
                ...state, loading: true
            }
        case CART.ADD_ITEM_TO_CART_SUCCESS:
            const item = action.payload
            const existingItemIndex = findItemIndex(state.products, item.id)
            if (existingItemIndex < 0) updateLocalStorage([...state.products, item])

            return {
                ...state,
                products: existingItemIndex >= 0 ? updateItemUnits(state.products, item) : [...state.products, item],
                loading: false
            }
        case CART.ADD_ITEM_TO_CART_ERROR:
            return {
                ...state, loading: false, errors: action.payload, products: []
            }
        case CART.UPDATE_CART_UNITS_REQUEST:
            return {
                ...state, loading: true
            }
        case CART.UPDATE_CART_UNITS_SUCCESS:
            const exItemIndex = findItemIndex(state.products, action.payload.id)

            if (exItemIndex >= 0) {
                let cartItem = state.products[exItemIndex]
                state.products[exItemIndex] = {
                    ...cartItem, units: action.payload.units
                }
            }

            updateLocalStorage([...state.products])
            return {
                ...state, products: [...state.products], loading: false
            }
        case CART.UPDATE_CART_UNITS_ERROR:
            return {
                ...state, loading: false, errors: action.payload, products: []
            }
        case CART.DELETE_CART_ITEM_REQUEST:
            return {
                ...state, loading: true
            }
        case CART.DELETE_CART_ITEM_SUCCESS:
            const itemIndex = findItemIndex(state.products, action.payload)
            if (itemIndex >= 0) {
                state.products.splice(itemIndex, 1);
            }
            updateLocalStorage([...state.products])
            return {
                ...state
            }
        case CART.DELETE_CART_ITEM_ERROR:
            return {
                ...state, loading: false, errors: action.payload, products: []
            }
        case CART.CLEAR_CART_ERRORS:
            return {
                ...state, errors: []
            }
        default:
            return state
    }
}

const updateLocalStorage = items => localStorage.setItem("cart", JSON.stringify(items))

const findItemIndex = (products, itemId) => products.findIndex(item => item.id === itemId)

const updateItemUnits = (products, item) => {
    const itemIndex = findItemIndex(products, item.id)
    const updatedItems = [...products]
    const existingItem = updatedItems[itemIndex]
    updatedItems[itemIndex] = {
        ...existingItem, units: item.units
    }
    updateLocalStorage(updatedItems)
    return updatedItems
}

export default cartReducer