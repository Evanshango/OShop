import {AUTH} from "../types";

const initialState = {
    loading: false,
    token: '',
    errors: []
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH.AUTH_REQUEST:
            return {
                ...state, loading: true
            }
        case AUTH.AUTH_SUCCESS:
            return {
                ...state, loading: false, token: action.payload, errors: []
            }
        case AUTH.AUTH_ERROR:
            return {
                ...state, loading: false, token: '', errors: action.payload
            }
        case AUTH.CLEAR_AUTH_ERRORS:
            return {
                ...state, errors: []
            }
        default:
            return state
    }
}

export default authReducer