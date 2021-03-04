import axios from "axios";
import {authError, authRequest, authSuccess, signOut} from "../redux/auth/authActions";
import {
    addSectionError, addSectionRequest, addSectionSuccess, clearSectionErrors, deleteSectionError, sectionsError,
    deleteSectionSuccess, sectionsRequest, sectionsSuccess
} from "../redux/sections/sectionActions";
import {
    addCategoryError, addCategoryRequest, addCategorySuccess, categoriesError, categoriesRequest,
    categoriesSuccess, clearCategoryErrors, deleteCategoryError, deleteCategorySuccess
} from "../redux/categories/categoryActions";
import {
    addProductError, addProductRequest, addProductSuccess, clearProductErrors, deleteProductError,
    deleteProductSuccess, productsError, productsRequest, productsSuccess
} from "../redux/products/productActions";

// const BASE_URL = 'http://localhost:5000/api/v1'
const BASE_URL = process.env.REACT_APP_BASE_URL

const dispatchError = (dispatch, err, method) => {
    const {response: {data}} = err
    dispatch(method(data.errors))
}

export const signOutUser = () => {
    return (dispatch) => {
        sessionStorage.removeItem('oshop')
        delete axios.defaults.headers.common['Authorization']
        dispatch(signOut())
    }
}

const setAuthHeader = token => {
    sessionStorage.setItem('oshop', `Bearer ${token}`)
    axios.defaults.headers["common"]['Authorization'] = `Bearer ${token}`
}

export const authUser = user => async dispatch => {
    dispatch(authRequest())
    try {
        const {data} = await axios.post(`${BASE_URL}/auth/signin`, user, {
            withCredentials: true,
            credentials: 'include'
        })
        setAuthHeader(data.token)
        dispatch(authSuccess(data.token))
    } catch (err) {
        dispatchError(dispatch, err, authError)
    }
}

export const fetchSections = () => async dispatch => {
    dispatch(sectionsRequest())
    try {
        const {data} = await axios.get(`${BASE_URL}/sections`)
        dispatch(sectionsSuccess(data))
    } catch (err) {
        dispatchError(dispatch, err, sectionsError)
    }
}

export const fetchCategories = () => async dispatch => {
    dispatch(categoriesRequest())
    try {
        const {data} = await axios.get(`${BASE_URL}/categories`)
        dispatch(categoriesSuccess(data))
    } catch (err) {
        dispatchError(dispatch, err, categoriesError)
    }
}

export const fetchCategoriesBySectionId = async (sectionId) => {
    try {
        const {data} = await axios.get(`${BASE_URL}/categories/section/${sectionId}`)
        return data
    } catch (e) {
        return e.response?.data
    }
}

export const addSection = name => async dispatch => {
    dispatch(addSectionRequest())
    try {
        const {data} = await axios.post(`${BASE_URL}/sections`, {name})
        dispatch(addSectionSuccess(data))
    } catch (e) {
        dispatchError(dispatch, e, addSectionError)
    }
}

export const deleteSection = id => async dispatch => {
    try {
        await axios.delete(`${BASE_URL}/sections/${id}`)
        dispatch(deleteSectionSuccess(id))
    } catch (err) {
        dispatchError(dispatch, err, deleteSectionError)
    }
}

export const clearSectErrors = () => async dispatch => {
    dispatch(clearSectionErrors())
}

export const addCategory = category => async dispatch => {
    dispatch(addCategoryRequest())
    try {
        const {data} = await axios.post(`${BASE_URL}/categories`, category)
        dispatch(addCategorySuccess(data))
    } catch (err) {
        dispatchError(dispatch, err, addCategoryError)
    }
}

export const deleteCategory = id => async dispatch => {
    try {
        await axios.delete(`${BASE_URL}/categories/${id}`)
        dispatch(deleteCategorySuccess(id))
    } catch (err) {
        dispatchError(dispatch, err, deleteCategoryError)
    }
}

export const clearCatErrors = () => dispatch => {
    dispatch(clearCategoryErrors())
}

export const fetchProducts = () => async dispatch => {
    dispatch(productsRequest())
    try {
        const {data} = await axios.get(`${BASE_URL}/products`)
        dispatch(productsSuccess(data))
    } catch (err) {
        dispatchError(dispatch, err, productsError)
    }
}

export const addProduct = product => async dispatch => {
    dispatch(addProductRequest())
    try{
        const {data} = await axios.post(`${BASE_URL}/products`, product)
        dispatch(addProductSuccess(data))
    } catch (err){
        dispatchError(dispatch, err, addProductError)
    }
}

export const deleteProduct = id => async dispatch => {
    try{
        await axios.delete(`${BASE_URL}/products/${id}`)
        dispatch(deleteProductSuccess(id))
    } catch (err) {
        dispatchError(dispatch, err, deleteProductError)
    }
}

export const clearProdErrors = () => dispatch => {
    dispatch(clearProductErrors())
}