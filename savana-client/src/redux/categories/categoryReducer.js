import {CATEGORIES} from "../types";

const initialState = {
    loading: false,
    categories: [],
    errors: []
}

const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case CATEGORIES.CATEGORIES_REQUEST:
            return {
                ...state, loading: true
            }
        case CATEGORIES.CATEGORIES_SUCCESS:
            return {
                ...state, categories: action.payload, loading: false, errors: []
            }
        case CATEGORIES.CATEGORIES_ERROR:
            return {
                ...state, categories: [], errors: action.payload, loading: false
            }
        case CATEGORIES.CLEAR_CATEGORIES_ERROR:
            return {
                ...state, errors: []
            }
        default:
            return state
    }
}

export default categoryReducer