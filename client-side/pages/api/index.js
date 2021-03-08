import axios from 'axios'
import {authError, authRequest, authSuccess, removeAuthErrors} from "../../redux/auth/authActions";
import {fetchSectionsError, fetchSectionsRequest, fetchSectionsSuccess} from "../../redux/sections/sectionActions";
import {
    addToCartError, addToCartRequest, addToCartSuccess, deleteCartError, deleteCartRequest, deleteCartSuccess,
    fetchCartError, fetchCartRequest, fetchCartSuccess, updateCartError, updateCartRequest, updateCartSuccess
} from "../../redux/cart/cartActions";
import {
    clearProductErrors, fetchProductsError, fetchProductsRequest, fetchProductsSuccess
} from "../../redux/products/productActions";

const BASE_URL = process.env.BASE_URL

const dispatchError = (dispatch, err, method) => {
    // const {response: {data}} = err
    // dispatch(method(data.errors))
    dispatch(method(err.response?.data?.errors))
}

const setAuthenticationHeader = token => {
    sessionStorage.setItem('oshop', `Bearer ${token}`)
    axios.defaults.headers["common"]['Authorization'] = `Bearer ${token}`
}

export const authUser = idToken => async dispatch => {
    dispatch(authRequest())
    try {
        const {data} = await axios.post(`${BASE_URL}/auth/google`, {idToken})
        dispatch(authSuccess(data.user))

    } catch (err) {
        // dispatch(authError({error: 'Error getting auth token'}))
        dispatchError(dispatch, err, null)
    }
}

export const loginUser = user => async dispatch => {
    dispatch(authRequest())
    try {
        const {data} = await axios.post(`${BASE_URL}/auth/signin`, user, {
            withCredentials: true,
            credentials: 'include'
        })
        setAuthenticationHeader(data.token)
        dispatch(authSuccess(data.token))
    } catch (err) {
        dispatchError(dispatch, err, authError)
    }
}

export const currentUser = user => async dispatch => dispatch(authSuccess(user))

export const clearAuthErrors = () => dispatch => dispatch(removeAuthErrors())

export const fetchSections = () => async dispatch => {
    dispatch(fetchSectionsRequest())
    try {
        const {data} = await axios.get(`${BASE_URL}/sections`)
        dispatch(fetchSectionsSuccess(data))
    } catch (err){
        dispatchError(dispatch, err, fetchSectionsError)
    }
}

export const fetchProducts = () => async dispatch => {
    dispatch(fetchProductsRequest())
    try {
        const {data} = await axios.get(`${BASE_URL}/products`)
        dispatch(fetchProductsSuccess(data))
    } catch (err){
        dispatchError(dispatch, err, fetchProductsError)
    }
}

export const clearProdErrors = () => dispatch => dispatch(clearProductErrors())

export const fetchCartItems = userId => async dispatch => {
    dispatch(fetchCartRequest())
    try {
        const {data} = await axios.get(`${BASE_URL}/cart`, {id: userId})
        dispatch(fetchCartSuccess(data))
    } catch (err){
        dispatchError(dispatch, err, fetchCartError)
    }
}

export const addCartItem = product => async dispatch => {
    dispatch(addToCartRequest())
    try {
        const {data} = await axios.post(`${BASE_URL}/cart`, product)
        dispatch(addToCartSuccess(data))
    } catch (err){
        dispatchError(dispatch, err, addToCartError)
    }
}

export const updateCartUnits = (id, units) => async dispatch => {
    dispatch(updateCartRequest())
    try {
        const {data} = await axios.patch(`${BASE_URL}/cart/${id}`, {units})
        dispatch(updateCartSuccess(data))
    } catch (err){
        dispatchError(dispatch, err, updateCartError)
    }
}

export const deleteCartItem = id => async dispatch => {
    dispatch(deleteCartRequest())
    try {
        await axios.delete(`${BASE_URL}/cart/${id}`)
        dispatch(deleteCartSuccess(id))
    } catch (err){
        dispatchError(dispatch, err, deleteCartError)
    }
}