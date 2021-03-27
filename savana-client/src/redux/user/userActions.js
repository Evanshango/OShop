import {USER} from "../types";

export const fetchUserRequest = () => {
    return {
        type: USER.FETCH_USER_REQUEST
    }
}

export const fetchUserSuccess = user => {
    return {
        type: USER.FETCH_USER_SUCCESS,
        payload: user
    }
}

export const fetchUserError = errors => {
    return {
        type: USER.FETCH_USER_ERROR,
        payload: errors
    }
}

export const clearUserErrors = () => {
    return {
        type: USER.CLEAR_USER_ERROR
    }
}