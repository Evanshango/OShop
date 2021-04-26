import {CATEGORIES} from "../types";

export const categoriesRequest = () => {
    return {
        type: CATEGORIES.CATEGORIES_REQUEST
    }
}

export const categoriesSuccess = categories => {
    return {
        type: CATEGORIES.CATEGORIES_SUCCESS,
        payload: categories
    }
}

export const categoriesError = errors => {
    return {
        type: CATEGORIES.CATEGORIES_ERROR,
        payload: errors
    }
}

export const addCategoryRequest = () => {
    return {
        type: CATEGORIES.ADD_CATEGORY_REQUEST
    }
}

export const addCategorySuccess = category => {
    return {
        type: CATEGORIES.ADD_CATEGORY_SUCCESS,
        payload: category
    }
}

export const addCategoryError = errors => {
    return {
        type: CATEGORIES.ADD_CATEGORY_ERROR,
        payload: errors
    }
}

export const deleteCategorySuccess = id => {
    return{
        type: CATEGORIES.DELETE_CATEGORY_SUCCESS,
        payload: id
    }
}

export const deleteCategoryError = errors => {
    return{
        type: CATEGORIES.DELETE_CATEGORY_ERROR,
        payload: errors
    }
}

export const clearCategoryErrors = () => {
    return{
        type: CATEGORIES.CLEAR_CATEGORY_ERRORS
    }
}