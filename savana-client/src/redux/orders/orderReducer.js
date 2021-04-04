import {ORDER} from "../types";

const initialState = {
    loading: false,
    order: {},
    orders: [],
    errors: []
}

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case ORDER.FETCH_ORDERS_REQUEST:
            return {
                ...state, loading: true
            }
        case ORDER.FETCH_ORDERS_SUCCESS:
            return {
                ...state, loading: false, orders: action.payload, errors: []
            }
        case ORDER.FETCH_ORDERS_ERROR:
            return {
                ...state, loading: false, errors: action.payload, orders: []
            }
        case ORDER.ADD_ORDER_REQUEST:
            return {
                ...state, loading: true
            }
        case ORDER.ADD_ORDER_SUCCESS:
            return {
                ...state, order: action.payload, loading: false, errors: []
            }
            // return {
            //     ...state, orders: [...state.orders, action.payload], loading: false, errors: []
            // }
        case ORDER.ADD_ORDER_ERROR:
            return {
                ...state, loading: false, errors: action.payload, orders: []
            }
        case ORDER.CLEAR_ORDER_ERRORS:
            return {
                ...state, errors: []
            }
        default:
            return state
    }
}

export default orderReducer