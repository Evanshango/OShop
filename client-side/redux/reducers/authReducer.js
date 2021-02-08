import {AUTH} from "../types";

const initialState = {
    loading: false,
    user: {},
    errors: {}
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH.AUTH_REQUEST:
            return {
                ...state, loading: true
            }
        case AUTH.AUTH_SUCCESS:
            return {
                ...state, loading: false, user: action.payload, errors: {}
            }
        case AUTH.AUTH_ERROR:
            return {
                ...state, loading: false, user: {}, errors: action.payload
            }
        default:
            return state
    }
}

export default authReducer