import {ORDER} from "../types"

const initialState = {
    loading: false,
    // order: {},
    orders: [],
    latest: {},
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
                ...state, latest: action.payload, loading: false, errors: []
            }
        case ORDER.ADD_ORDER_ERROR:
            return {
                ...state, loading: false, errors: action.payload, latest: {}
            }
        case ORDER.CLEAR_NEW_ORDER:
            return {
                ...state, loading: false, errors: [], latest: {}
            }
        case ORDER.FETCH_LATEST_ORDER_REQUEST:
            return {
                ...state, loading: true
            }
        case ORDER.FETCH_LATEST_ORDER_SUCCESS:
            return {
                ...state, loading: false, errors: [], latest: action.payload
            }
        case ORDER.FETCH_LATEST_ORDER_ERROR:
            return {
                ...state, loading: false, latest: {}, errors: action.payload
            }
        case ORDER.CANCEL_LATEST_ORDER_REQUEST:
            return {
                ...state, loading: true
            }
        case ORDER.CANCEL_LATEST_ORDER_SUCCESS:
            return {
                ...state, loading: false, latest: state.latest.id === action.payload ? {} : state.latest, errors: []
            }
        case ORDER.CANCEL_LATEST_ORDER_ERROR:
            return {
                ...state, loading: false, errors: action.payload, latest: state.latest
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
