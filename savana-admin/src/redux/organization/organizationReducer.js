import {ORGANIZATION} from "../types"

const initialState = {
    loading: false,
    organizations: [],
    message: '',
    count: null,
    page: null,
    pages: null,
    errors: []
}

const organizationReducer = (state = initialState, action) => {
    switch (action.type) {
        case ORGANIZATION.FETCH_ORG_REQUEST:
            return {
                ...state, loading: true
            }
        case ORGANIZATION.FETCH_ORG_SUCCESS:
            const {organizations, count, page, pages} = action.payload
            return {
                ...state, loading: false, organizations: organizations, count, page, pages, errors: []
            }
        case ORGANIZATION.FETCH_ORG_ERROR:
            return {
                ...state,
                loading: false,
                organizations: [],
                errors: action.payload,
                count: null,
                page: null,
                pages: null
            }
        case ORGANIZATION.ADD_ORG_REQUEST:
            return {
                ...state, loading: true
            }
        case ORGANIZATION.ADD_ORG_SUCCESS:
            return {
                ...state,
                organizations: [...state.organizations, action.payload.organization],
                loading: false,
                message: action.payload.message,
                errors: []
            }
        case ORGANIZATION.ADD_ORG_ERROR:
            return {
                ...state, loading: false, errors: action.payload, message: ''
            }
        case ORGANIZATION.EDIT_ORG_REQUEST:
            return {
                ...state, loading: true
            }
        case ORGANIZATION.EDIT_ORG_SUCCESS:
            let index = state.organizations.findIndex(org => org.id === action.payload.id)
            state.organizations[index] = action.payload
            return {
                ...state, loading: false, errors: []
            }
        case ORGANIZATION.ACTIVATE_ORG_REQUEST:
            return {
                ...state, loading: true
            }
        case ORGANIZATION.ACTIVATE_ORG_SUCCESS:
            return {
                ...state, loading: false, message: action.payload.message, errors:[]
            }
        case ORGANIZATION.ACTIVATE_ORG_ERROR:
            return {
                ...state, loading: false, message: '', errors: action.payload
            }
        case ORGANIZATION.CLEAR_ORG_ERRORS:
            return {
                ...state, errors: [], message: ''
            }
        default:
            return state
    }
}

export default organizationReducer
