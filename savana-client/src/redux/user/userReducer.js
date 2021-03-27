import {USER} from '../types'

const initialState = {
    loading: false,
    user: {},
    errors: []
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER.FETCH_USER_REQUEST:
            return {
                ...state, loading: true
            }
        case USER.FETCH_USER_SUCCESS:
            return {
                ...state, user: action.payload, errors: [], loading: false
            }
        case USER.FETCH_USER_ERROR:
            return {
                ...state, loading: false, errors: action.payload, user: {}
            }
        case USER.CLEAR_USER_ERROR:
            return {
                ...state, errors: []
            }
        default:
            return state
    }
}

export default userReducer