import {AUTH} from "../types"

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

export const activateLinkRequest = () => {
    return {
        type: AUTH.ACTIVATION_LINK_REQUEST
    }
}

export const activateLinkSuccess = message => {
    return {
        type: AUTH.ACTIVATION_LINK_SUCCESS,
        payload: message
    }
}

export const activateLinkError = errors => {
    return {
        type: AUTH.ACTIVATION_LINK_ERROR,
        payload: errors
    }
}

export const verifyAccountRequest = () => {
    return {
        type: AUTH.VERIFY_ACCOUNT_REQUEST
    }
}

export const verifyAccountSuccess = message => {
    return {
        type: AUTH.VERIFY_ACCOUNT_SUCCESS,
        payload: message
    }
}

export const verifyAccountError = errors => {
    return {
        type: AUTH.VERIFY_ACCOUNT_ERROR,
        payload: errors
    }
}

export const removeAuthErrors = () => {
    return {
        type: AUTH.CLEAR_AUTH_ERRORS
    }
}
