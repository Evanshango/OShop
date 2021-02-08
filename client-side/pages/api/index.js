import axios from 'axios'
import Router from 'next/router'
import {authError, authRequest, authSuccess} from "../../redux/actions/authActions";

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