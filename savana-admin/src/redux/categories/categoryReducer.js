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
                ...state, loading: false, categories: action.payload, errors: []
            }
        case CATEGORIES.CATEGORIES_ERROR:
            return {
                ...state, loading: false, categories: [], errors: action.payload
            }
        case CATEGORIES.ADD_CATEGORY_REQUEST:
            return {
                ...state, loading: true
            }
        case CATEGORIES.ADD_CATEGORY_SUCCESS:
            return {
                ...state, categories: [...state.categories, action.payload], loading: false, errors: []
            }
        case CATEGORIES.ADD_CATEGORY_ERROR:
            return {
                ...state, errors: action.payload, loading: false
            }
        case CATEGORIES.DELETE_CATEGORY_SUCCESS:
            return {
                ...state, categories: state.categories.filter(category => category.id !== action.payload), errors: []
            }
        case CATEGORIES.DELETE_CATEGORY_ERROR:
            return {
                ...state, errors: action.payload
            }
        case CATEGORIES.CLEAR_CATEGORY_ERRORS:
            return {
                ...state, errors: []
            }
        default:
            return state
    }
}

export default categoryReducer