import {ORGANIZATION} from "../types"

const initialState = {
    loading: false,
    organizations: [],
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
                ...state, loading: false, organizations: [], errors: action.payload, count: null, page: null, pages: null
            }
        case ORGANIZATION.ADD_ORG_REQUEST:
            return {
                ...state, loading: true
            }
        case ORGANIZATION.ADD_ORG_SUCCESS:
            return {
                ...state, organizations: [...state.organizations, action.payload], loading: false, errors: []
            }
        case ORGANIZATION.ADD_ORG_ERROR:
            return {
                ...state, loading: false, organizations: [], errors: action.payload
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
        case ORGANIZATION.CLEAR_ORG_ERRORS:
            return {
                ...state, errors: []
            }
        default:
            return state
    }
}

export default organizationReducer
