import {AUTH} from "../types";

export const authRequest = () => {
    return {
        type: AUTH.AUTH_REQUEST
    }
}

export const authSuccess = token => {
    return {
        type: AUTH.AUTH_SUCCESS,
        payload: token
    }
}

export const authError = error => {
    return {
        type: AUTH.AUTH_ERROR,
        payload: error
    }
}

export const removeAuthErrors = () => {
    return {
        type: AUTH.CLEAR_AUTH_ERRORS
    }
}