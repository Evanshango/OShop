import {SECTIONS} from "../types";

const initialState = {
    loading: false,
    sections: [],
    errors: []
}

const sectionsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SECTIONS.SECTIONS_REQUEST:
            return {
                ...state, loading: true
            }
        case SECTIONS.SECTIONS_SUCCESS:
            return {
                ...state, loading: false, sections: action.payload, errors: []
            }
        case SECTIONS.SECTIONS_ERROR:
            return {
                ...state, loading: false, sections: [], errors: action.payload
            }
        case SECTIONS.ADD_SECTION_REQUEST:
            return {
                ...state, loading: true
            }
        case SECTIONS.ADD_SECTION_SUCCESS:
            return {
                ...state, sections: [...state.sections, action.payload], loading: false, errors: []
            }
        case SECTIONS.ADD_SECTION_ERROR:
            return {
                ...state, errors: action.payload, loading: false
            }
        case SECTIONS.DELETE_SECTION_SUCCESS:
            return {
                ...state, sections: state.sections.filter(section => section.id !== action.payload), errors: []
            }
        case SECTIONS.DELETE_SECTION_ERROR:
            return {
                ...state, errors: action.payload
            }
        case SECTIONS.CLEAR_SECTION_ERRORS:
            return {
                ...state, errors: []
            }
        default:
            return state
    }
}

export default sectionsReducer