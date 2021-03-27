import {ADDRESSES} from "../types";

const initialState = {
    loading: false,
    addresses: [],
    errors: []
}

const addressReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADDRESSES.FETCH_ADDRESS_REQUEST:
            return {
                ...state, loading: true
            }
        case ADDRESSES.FETCH_ADDRESS_SUCCESS:
            return {
                ...state, loading: false, addresses: action.payload, errors: []
            }
        case ADDRESSES.FETCH_ADDRESS_ERROR:
            return {
                ...state, errors: action.payload, loading: false, addresses: []
            }
        case ADDRESSES.ADD_ADDRESS_REQUEST:
            return {
                ...state, loading: true
            }
        case ADDRESSES.ADD_ADDRESS_SUCCESS:
            return {
                ...state, addresses: [...state.addresses, action.payload], loading: false, errors: []
            }
        case ADDRESSES.ADD_ADDRESS_ERROR:
            return {
                ...state, loading: false, errors: action.payload
            }
        case ADDRESSES.CLEAR_ADDRESS_ERROR:
            return {
                ...state, errors: []
            }
        default:
            return state
    }
}

export default addressReducer