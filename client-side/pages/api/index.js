import axios from 'axios'
import {authError, authRequest, authSuccess} from "../../redux/actions/authActions";
import {addToCart, removeCartItem} from "../../redux/cart/cartActions";

const BASE_URL = process.env.BASE_URL

export const authUser = idToken => async dispatch => {
    dispatch(authRequest())
    try {
        const {data} = await axios.post(`${BASE_URL}/auth/google`, {idToken})
        dispatch(authSuccess(data.user))

    } catch (err) {
        dispatch(authError({error: 'Error getting auth token'}))
    }
}

export const loginUser = user => async dispatch => {
    dispatch(authRequest())
    try {
        const {data} = await axios.post(`${BASE_URL}/signin`, user)
        dispatch(authSuccess(data.user))
    } catch (err) {
        dispatch(authError({error: 'failed login'}))
    }
}

export const currentUser = user => async dispatch => {
    dispatch(authSuccess(user))
}

export const addItemToCart = product => {
    return (dispatch) => {
        dispatch(addToCart(product))
    }
}

export const deleteCartItem = id => {
    return (dispatch) => {
        dispatch(removeCartItem(id))
    }
}