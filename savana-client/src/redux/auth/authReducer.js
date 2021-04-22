import {AUTH} from "../types"

const initialState = {
    loading: false,
    token: '',
    message: '',
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
                ...state,
                loading: false,
                token: action.payload.token ? action.payload.token : '',
                errors: [],
                message: action.payload.message ? action.payload.message : ''
            }
        case AUTH.AUTH_ERROR:
            return {
                ...state, loading: false, token: '', errors: action.payload, message: ''
            }
        case AUTH.ACTIVATION_LINK_REQUEST:
            return {
                ...state, loading: true
            }
        case AUTH.ACTIVATION_LINK_SUCCESS:
            return {
                ...state, loading: false, message: action.payload.message, errors: []
            }
        case AUTH.ACTIVATION_LINK_ERROR:
            return {
                ...state, loading: false, errors: action.payload, message: ''
            }
        case AUTH.VERIFY_ACCOUNT_REQUEST:
            return {
                ...state, loading: true
            }
        case AUTH.VERIFY_ACCOUNT_SUCCESS:
            return {
                ...state, loading: false, message: action.payload.message, errors: []
            }
        case AUTH.VERIFY_ACCOUNT_ERROR:
            return {
                ...state, loading: false, message: '', errors: action.payload
            }
        case AUTH.CLEAR_AUTH_ERRORS:
            return {
                ...state, errors: [], message: '', token: ''
            }
        default:
            return state
    }
}

export default authReducer
