import axios from 'axios'
import {authError, authRequest, authSuccess, removeAuthErrors} from "../../redux/auth/authActions";
import {fetchSectionsError, fetchSectionsRequest, fetchSectionsSuccess} from "../../redux/sections/sectionActions";
import {
    addToCartError, addToCartRequest, addToCartSuccess, clearCartError, deleteCartError, deleteCartRequest,
    deleteCartSuccess, fetchCartError, fetchCartRequest, fetchCartSuccess
} from "../../redux/cart/cartActions";
import {
    clearProductErrors, fetchProductsError, fetchProductsRequest, fetchProductsSuccess
} from "../../redux/products/productActions";
import {
    addOrderError, addOrderRequest, addOrderSuccess, clearOrderError, fetchOrdersError, fetchOrdersRequest,
    fetchOrdersSuccess
} from "../../redux/orders/orderActions";
import _ from 'lodash'

const BASE_URL = process.env.BASE_URL

const dispatchError = (dispatch, err, method) => {
    // const {response: {data}} = err
    // dispatch(method(data.errors))
    dispatch(method(err.response?.data?.errors))
}

export const setAuthenticationHeader = token => {
    sessionStorage.setItem('oshop', `Bearer ${token}`)
    axios.defaults.headers["common"]['Authorization'] = `Bearer ${token}`
}

export const authUser = idToken => async dispatch => {
    dispatch(authRequest())
    try {
        const {data} = await axios.post(`${BASE_URL}/auth/google`, {idToken})
        dispatch(authSuccess(data.user))

    } catch (err) {
        dispatchError(dispatch, err, authError)
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
    } catch (err) {
        dispatchError(dispatch, err, fetchSectionsError)
    }
}

export const fetchProducts = () => async dispatch => {
    dispatch(fetchProductsRequest())
    try {
        const {data} = await axios.get(`${BASE_URL}/products`)
        dispatch(fetchProductsSuccess(data))
    } catch (err) {
        dispatchError(dispatch, err, fetchProductsError)
    }
}

export const clearProdErrors = () => dispatch => dispatch(clearProductErrors())

export const uploadCart = cart => async dispatch => {
    try {
        const {data} = await axios.post(`${BASE_URL}/cart`, {items: Object.values(cart), sync: true})
        dispatch(fetchCartSuccess(data))
    } catch (err){
        dispatchError(dispatch, err, addToCartError)
    }
}

export const fetchCartItems = () => async dispatch => {
    dispatch(fetchCartRequest())
    try {
        const {data} = await axios.get(`${BASE_URL}/cart`)
        dispatch(fetchCartSuccess(data))
    } catch (err) {
        dispatchError(dispatch, err, fetchCartError)
    }
}

export const addCartItem = (item, qty = 1, token) => async dispatch => {
    if (token){
        dispatch(addToCartRequest())
        try {
            const {data} = await axios.post(`${BASE_URL}/cart`, {items: [{...item, units: qty}]})
            !_.isEmpty(data) && dispatch(addToCartSuccess({...item, units: qty}))
        } catch (err) {
            dispatchError(dispatch, err, addToCartError)
        }
    } else {
        dispatch(addToCartSuccess({...item, units: qty}))
    }
}

export const deleteCartItem = id => async dispatch => {
    dispatch(deleteCartRequest())
    try {
        await axios.delete(`${BASE_URL}/cart/${id}`)
        dispatch(deleteCartSuccess(id))
    } catch (err) {
        dispatchError(dispatch, err, deleteCartError)
    }
}

export const updateCart = () => dispatch => {
    const cart = localStorage.getItem('oshopCart') ? JSON.parse(localStorage.getItem('oshopCart')) : null
    if (cart) dispatch(fetchCartSuccess(cart))
}

export const clearCartErrors = () => dispatch => dispatch(clearCartError())

export const fetchOrderItems = () => async dispatch => {
    dispatch(fetchOrdersRequest())
    try {
        const {data} = await axios.get(`${BASE_URL}/orders`)
        dispatch(fetchOrdersSuccess(data))
    } catch (err) {
        dispatchError(dispatch, err, fetchOrdersError)
    }
}

export const addOrder = order => async dispatch => {
    dispatch(addOrderRequest())
    try {
        const {data} = await axios.post(`${BASE_URL}/orders`, order)
        dispatch(addOrderSuccess(data))
    } catch (err) {
        dispatchError(dispatch, err, addOrderError)
    }
}

export const clearOrderErrors = () => dispatch => dispatch(clearOrderError())