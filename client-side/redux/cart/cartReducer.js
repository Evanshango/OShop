import {CART} from "../types";

const initialState = {
    loading: false,
    products: [],
    errors: []
}

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case CART.FETCH_CART_ITEMS:
            return {
                ...state, products: action.payload
            }
        case CART.ADD_ITEM_TO_CART:
            const {products} = state
            const item = action.payload
            const existingItemIndex = findItemIndex(products, item.id)
            if (existingItemIndex < 0) {
                localStorage.setItem("cartItems", JSON.stringify([...products, item]))
            }
            return {
                ...state, products: existingItemIndex >= 0 ? updateItemUnits(products, item) : [...products, item]
            }
        case CART.UPDATE_CART_UNITS:
            const exItemIndex = findItemIndex(state.cart, action.payload.id)
            if (exItemIndex >= 0) {
                let cartItem = state.products[exItemIndex]
                state.cart[exItemIndex] = {
                    ...cartItem, units: action.payload.units, subTotal: action.payload.units * cartItem.price
                }
            }
            localStorage.setItem('cartItems', JSON.stringify([...state.cart]))
            return {
                ...state, cart: [...state.cart]
            }
        /*todo*/
        case CART.DELETE_CART_ITEM:
            console.log(`${action.payload} deleted`)
            return {
                ...state
            }
        default:
            return state
    }
}

const findItemIndex = (products, itemId) => products.findIndex(item => item.id === itemId)

const updateItemUnits = (products, item) => {
    const itemIndex = findItemIndex(products, item.id)
    const updatedItems = [...products]
    const existingItem = updatedItems[itemIndex]
    updatedItems[itemIndex] = {
        ...existingItem, units: existingItem.units + item.units, subTotal: (existingItem.units + 1) * item.price
    }
    localStorage.setItem("cartItems", JSON.stringify(updatedItems))
    return updatedItems
}

export default cartReducer