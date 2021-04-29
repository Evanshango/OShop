import {ORGANIZATION} from "../types"

export const requestLinkRequest = () => {
    return {
        type: ORGANIZATION.REQUEST_LINK_REQUEST
    }
}

export const requestLinkSuccess = message => {
    return {
        type: ORGANIZATION.REQUEST_LINK_SUCCESS,
        payload: message
    }
}

export const requestLinkError = errors => {
    return {
        type: ORGANIZATION.REQUEST_LINK_ERROR,
        payload: errors
    }
}

export const clearRequestErrors = () => {
    return{
        type: ORGANIZATION.CLEAR_REQUEST_ERRORS
    }
}
