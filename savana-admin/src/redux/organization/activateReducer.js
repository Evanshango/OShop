import {ORGANIZATION} from "../types"

const initialState = {
    loading: false,
    message: '',
    errors: []
}

const requestReducer = (state = initialState, action) => {
    switch (action.type) {
        case ORGANIZATION.REQUEST_LINK_REQUEST:
            return {
                ...state, loading: true
            }
        case ORGANIZATION.REQUEST_LINK_SUCCESS:
            return {
                ...state, loading: false, message: action.payload.message, errors: []
            }
        case ORGANIZATION.REQUEST_LINK_ERROR:
            return {
                ...state, loading: false, errors: action.payload, message: ''
            }
        case ORGANIZATION.CLEAR_REQUEST_ERRORS:
            return {
                ...state, loading: false, errors: [], message: ''
            }
        default:
            return state
    }
}

export default requestReducer
