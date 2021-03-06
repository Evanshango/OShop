import axios from 'axios'
import {
    activateLinkError,
    activateLinkRequest,
    activateLinkSuccess,
    authError,
    authRequest,
    authSuccess,
    removeAuthErrors,
    verifyAccountError,
    verifyAccountRequest,
    verifyAccountSuccess
} from "../redux/auth/authActions"
import {fetchSectionsError, fetchSectionsRequest, fetchSectionsSuccess} from "../redux/sections/sectionActions"
import {
    clearProductErrors,
    fetchProductsError,
    fetchProductsRequest,
    fetchProductsSuccess
} from "../redux/products/productActions"
import {
    addToCartError,
    addToCartRequest,
    addToCartSuccess,
    clearCartError,
    clearCartItems,
    deleteCartError,
    deleteCartRequest,
    deleteCartSuccess,
    fetchCartError,
    fetchCartRequest,
    fetchCartSuccess
} from "../redux/cart/cartActions"
import {
    addAddressError,
    addAddressRequest,
    addAddressSuccess,
    clearAddressErrors,
    fetchAddressesError,
    fetchAddressesRequest,
    fetchAddressesSuccess
} from "../redux/address/addressActions"
import {checkoutParams} from "../redux/checkout/checkoutActions"
import {
    addOrderError,
    addOrderRequest,
    addOrderSuccess,
    cancelLatestOrderError,
    cancelLatestOrderRequest,
    cancelLatestOrderSuccess,
    clearNewOrder,
    clearOrderError,
    fetchLatestOrderError,
    fetchLatestOrderRequest,
    fetchLatestOrderSuccess,
    fetchOrdersError,
    fetchOrdersRequest,
    fetchOrdersSuccess
} from "../redux/orders/orderActions"
import {clearOffersErrors, fetchOffersError, fetchOffersRequest, fetchOffersSuccess} from "../redux/offers/offerActions"
import _ from 'lodash'
import {fetchProductError, fetchProductRequest, fetchProductSuccess} from "../redux/product/productActions"
import {fetchUserError, fetchUserRequest, fetchUserSuccess} from "../redux/user/userActions"
import {
    clearPayment,
    clearPaypalErrors,
    makePaypalPayError,
    makePaypalPayRequest,
    makePaypalPaySuccess
} from "../redux/paypal/paypalActions"
import {fetchCategoriesError, fetchCategoriesRequest, fetchCategoriesSuccess} from "../redux/categories/categoryActions"
import {clearMpesaError, payMpesaError, payMpesaRequest, payMpesaSuccess} from "../redux/payment/paymentActions"

const BASE_URL = process.env.REACT_APP_BASE_URL

const dispatchError = (dispatch, err, method) => {
    dispatch(method(err.response?.data?.errors))
}

export const setAuthenticationHeader = token => {
    sessionStorage.setItem('savana', `Bearer ${token}`)
    axios.defaults.headers["common"]['Authorization'] = `Bearer ${token}`
}

export const authUser = (idToken, products) => dispatch => {
    dispatch(authRequest())
    uploadCart('auth/google', {idToken}, products, dispatch)
}

export const loginUser = (user, products, history, from) => async dispatch => {
    dispatch(authRequest())
    uploadCart('auth/signin', user, products, dispatch, history, from)
}

export const returnFormattedPhone = phone => {
    let message, formatted
    const invalidChars = ['7', '8', '6', '3']
    if (phone.length < 10 || phone.length > 12) {
        message = 'invalid'
        formatted = ''
    }

    if (phone.startsWith(0) || phone.includes('+')) {
        formatted = `254${phone.substring(1, 10)}`
        message = 'valid'
    }

    if (phone.includes(254)) {
        formatted = phone
        message = 'valid'
    }

    if (formatted.length < 12){
        message = 'invalid'
        formatted = ''
    }

    if (invalidChars.includes(formatted.charAt(4))){
        message = 'invalid'
        formatted = ''
    }

    return {message, formatted}

}

export const registerUser = (user) => async dispatch => {
    dispatch(authRequest())
    try {
        const {data} = await axios.post(`${BASE_URL}/auth/signup`, user)
        dispatch(authSuccess(data))
    } catch (err) {
        dispatchError(dispatch, err, authError)
    }
}

const uploadCart = (url, params, products, dispatch, history, from) => {
    let token
    let returnUrl = from === undefined ? '/' : from
    axios.post(`${BASE_URL}/${url}`, params, {withCredentials: true, credentials: 'include'}).then(({data}) => {
        setAuthenticationHeader(data.token)
        token = data
    }).then(async () => {
        if (Object.values(products).length > 0) {
            try {
                const {data} = await axios.post(`${BASE_URL}/cart`, {items: Object.values(products), sync: true})
                dispatch(fetchCartSuccess(data))
            } catch (err) {
                dispatchError(dispatch, err, addToCartError)
            }
        }
    }).then(() => {
        dispatch(authSuccess(token))
        history.push(returnUrl)
    }).catch(err => {
        dispatchError(dispatch, err, authError)
    })
}

export const fetchUser = () => async dispatch => {
    dispatch(fetchUserRequest())
    try {
        const {data} = await axios.get(`${BASE_URL}/users/current`)
        dispatch(fetchUserSuccess(data))
    } catch (err) {
        dispatchError(dispatch, err, fetchUserError)
    }
}

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

export const fetchCategories = () => async dispatch => {
    dispatch(fetchCategoriesRequest())
    try {
        const {data} = await axios.get(`${BASE_URL}/categories`)
        dispatch(fetchCategoriesSuccess(data))
    } catch (err) {
        dispatchError(dispatch, err, fetchCategoriesError)
    }
}

export const fetchProducts = (page, limit, filter) => async dispatch => {
    dispatch(fetchProductsRequest())
    try {
        let response
        if (filter) {
            response = await axios.post(`${BASE_URL}/products/filters?page=${page}&limit=${limit}`, filter)
        } else {
            response = await axios.get(`${BASE_URL}/products?page=${page}&limit=${limit}`)
        }
        dispatch(fetchProductsSuccess(response.data))
    } catch (err) {
        dispatchError(dispatch, err, fetchProductsError)
    }
}

export const clearProdErrors = () => dispatch => dispatch(clearProductErrors())

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
    if (token) {
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

export const deleteCartItem = (id, token) => async dispatch => {
    if (token) {
        dispatch(deleteCartRequest())
        try {
            const {data} = await axios.delete(`${BASE_URL}/cart/${id}`)
            dispatch(deleteCartSuccess(data.id))
        } catch (err) {
            dispatchError(dispatch, err, deleteCartError)
        }
    } else {
        dispatch(deleteCartSuccess(id))
    }
}

export const updateCart = () => dispatch => {
    const cart = localStorage.getItem('savanaCart') ? JSON.parse(localStorage.getItem('savanaCart')) : null
    if (cart) dispatch(fetchCartSuccess(cart))
}

export const clearCartErrors = () => dispatch => dispatch(clearCartError())

export const fetchUserAddresses = () => async dispatch => {
    dispatch(fetchAddressesRequest())
    try {
        const {data} = await axios.get(`${BASE_URL}/addresses`)
        dispatch(fetchAddressesSuccess(data))
    } catch (err) {
        dispatchError(dispatch, err, fetchAddressesError)
    }
}

export const addAddress = address => async dispatch => {
    dispatch(addAddressRequest())
    try {
        const {data} = await axios.post(`${BASE_URL}/addresses`, address)
        dispatch(addAddressSuccess(data))
        return data.id
    } catch (err) {
        dispatchError(dispatch, err, addAddressError)
    }
}

export const clearAddressError = () => dispatch => dispatch(clearAddressErrors())

export const addCheckOutParam = checkout => dispatch => dispatch(checkoutParams(checkout))

export const fetchOrderItems = () => async dispatch => {
    dispatch(fetchOrdersRequest())
    try {
        const {data} = await axios.get(`${BASE_URL}/orders/user`)
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

export const fetchOffers = () => async dispatch => {
    dispatch(fetchOffersRequest())
    try {
        const {data} = await axios.get(`${BASE_URL}/offers/active`)
        dispatch(fetchOffersSuccess(data))
    } catch (err) {
        dispatchError(dispatch, err, fetchOffersError)
    }
}

export const clearOfferErrors = () => dispatch => dispatch(clearOffersErrors())

export const fetchProduct = id => async dispatch => {
    dispatch(fetchProductRequest())
    try {
        const {data} = await axios.get(`${BASE_URL}/products/${id}`)
        dispatch(fetchProductSuccess(data))
    } catch (err) {
        dispatchError(dispatch, err, fetchProductError)
    }
}

export const clearProductError = () => dispatch => dispatch(clearProductErrors())

export const paypalPayment = payment => async dispatch => {
    dispatch(makePaypalPayRequest())
    try {
        const {data} = await axios.post(`${BASE_URL}/payments`, payment)
        dispatch(makePaypalPaySuccess(data))
        dispatch(clearNewOrder())
        dispatch(clearCartItems())
    } catch (err) {
        dispatchError(dispatch, err, makePaypalPayError)
    }
}

export const clearPaymentError = () => dispatch => dispatch(clearPaypalErrors())

export const clearPaymentValues = () => dispatch => dispatch(clearPayment())

export const searchProducts = searchTerm => async dispatch => {
    dispatch(fetchProductsRequest())
    try {
        const {data} = await axios.get(`${BASE_URL}/products?search=${searchTerm}`)
        dispatch(fetchProductsSuccess(data))
    } catch (err) {
        dispatchError(dispatch, err, fetchProductError)
    }
}

export const requestLink = email => async dispatch => {
    dispatch(activateLinkRequest())
    try {
        const {data} = await axios.post(`${BASE_URL}/auth/activate`, email)
        dispatch(activateLinkSuccess(data))
    } catch (err) {
        dispatchError(dispatch, err, activateLinkError)
    }
}

export const verifyAccount = token => async dispatch => {
    dispatch(verifyAccountRequest())
    try {
        const {data} = await axios.get(`${BASE_URL}/auth/account/${token}`)
        dispatch(verifyAccountSuccess(data))
    } catch (err) {
        dispatchError(dispatch, err, verifyAccountError)
    }
}

export const fetchLatestOrder = () => async dispatch => {
    dispatch(fetchLatestOrderRequest())
    try {
        const {data} = await axios.get(`${BASE_URL}/orders/latest`)
        dispatch(fetchLatestOrderSuccess(data))
    } catch (err) {
        dispatchError(dispatch, err, fetchLatestOrderError)
    }
}

export const cancelLatestOrder = orderId => async dispatch => {
    dispatch(cancelLatestOrderRequest())
    try {
        const {data} = await axios.delete(`${BASE_URL}/orders/${orderId}`)
        dispatch(cancelLatestOrderSuccess(data))
    } catch (err) {
        dispatchError(dispatch, err, cancelLatestOrderError)
    }
}

export const makeMpesaPayment = (phone, amount, orderId, randomId) => async dispatch => {
    dispatch(payMpesaRequest())
    try {
        const {data} = await axios.post(`${BASE_URL}/payments/m`, {phone, amount, orderId, randomId})
        dispatch(payMpesaSuccess(data.message))
    } catch (err) {
        dispatchError(dispatch, err, payMpesaError)
    }
}

export const clearMpesaPayErrors = () => dispatch => dispatch(clearMpesaError())

export const signOut = () => dispatch => {
    sessionStorage.removeItem('savana')
    delete axios.defaults.headers['common']['Authorization']
    dispatch(fetchOrdersSuccess([]))
    dispatch(fetchAddressesSuccess([]))
    dispatch(fetchCartSuccess({}))
    dispatch(authSuccess(''))
    dispatch(fetchUserSuccess({}))
    dispatch(clearNewOrder())
}
