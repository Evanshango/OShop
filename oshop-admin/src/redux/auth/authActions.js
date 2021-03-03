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