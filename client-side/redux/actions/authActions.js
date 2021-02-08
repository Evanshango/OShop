import {AUTH} from "../types";

export const authRequest = () => {
    return {
        type: AUTH.AUTH_REQUEST
    }
}

export const authSuccess = user => {
    return{
        type: AUTH.AUTH_SUCCESS,
        payload: user
    }
}

export const authError = error => {
    return{
        type: AUTH.AUTH_ERROR,
        payload: error
    }
}