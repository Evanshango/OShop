import {SECTIONS} from "../types";

export const fetchSectionsRequest = () => {
    return {
        type: SECTIONS.SECTIONS_REQUEST
    }
}

export const fetchSectionsSuccess = sections => {
    return {
        type: SECTIONS.SECTIONS_SUCCESS,
        payload: sections
    }
}

export const fetchSectionsError = errors => {
    return {
        type: SECTIONS.SECTIONS_ERROR,
        payload: errors
    }
}

export const clearSectionErrors = () => {
    return {
        type: SECTIONS.CLEAR_SECTION_ERRORS
    }
}