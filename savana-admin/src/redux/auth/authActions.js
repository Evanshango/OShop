import {AUTH} from "../types";

export const authRequest = () => {
    return {
        type: AUTH.AUTH_REQUEST
    }
}

export const authSuccess = token => {
    return{
        type: AUTH.AUTH_SUCCESS,
        payload: token
    }
}

export const authError = errors => {
    return{
        type: AUTH.AUTH_ERROR,
        payload: errors
    }
}

export const signOut = () => {
    return {
        type: AUTH.SIGNOUT_USER
    }
}

export const clearAuthErrors = () => {
    return{
        type: AUTH.CLEAR_AUTH_ERRORS
    }
}

export const userObject = user => {
    return{
        type: AUTH.SET_USER,
        payload: user
    }
}
