import {CATEGORIES} from "../types";

export const fetchCategoriesRequest = () => {
    return{
        type: CATEGORIES.CATEGORIES_REQUEST
    }
}

export const fetchCategoriesSuccess = categories => {
    return{
        type: CATEGORIES.CATEGORIES_SUCCESS,
        payload: categories
    }
}

export const fetchCategoriesError = errors => {
    return{
        type: CATEGORIES.CATEGORIES_ERROR,
        payload: errors
    }
}

export const clearCategoriesErrors = () => {
    return{
        type: CATEGORIES.CLEAR_CATEGORIES_ERROR
    }
}