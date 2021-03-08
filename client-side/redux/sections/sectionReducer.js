import {SECTIONS} from "../types";

const initialState = {
    loading: false,
    sections: [],
    errors: []
}

const sectionReducer = (state = initialState, action) => {
    switch (action.type) {
        case SECTIONS.SECTIONS_REQUEST:
            return {
                ...state, loading: true
            }
        case SECTIONS.SECTIONS_SUCCESS:
            return {
                ...state, sections: action.payload, loading: false, errors: []
            }
        case SECTIONS.SECTIONS_ERROR:
            return {
                ...state, sections: [], errors: action.payload, loading: false
            }
        case SECTIONS.CLEAR_SECTION_ERRORS:
            return {
                ...state, errors: []
            }
        default:
            return state
    }
}

export default sectionReducer