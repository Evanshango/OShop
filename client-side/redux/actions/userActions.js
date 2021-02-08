import {USER} from "../types";

export const userRequest = () => {
    return {
        type: USER.USER_REQUEST
    }
}

export const userSuccess = user => {
    return{
        type: USER.USER_SUCCESS,
        payload: user
    }
}

export const userError = error => {
    return{
        type: USER.USER_ERROR,
        payload: error
    }
}