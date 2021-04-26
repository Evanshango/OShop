import {SECTIONS} from "../types";

export const sectionsRequest = () => {
    return {
        type: SECTIONS.SECTIONS_REQUEST
    }
}

export const sectionsSuccess = sections => {
    return{
        type: SECTIONS.SECTIONS_SUCCESS,
        payload: sections
    }
}

export const sectionsError = errors => {
    return{
        type: SECTIONS.SECTIONS_ERROR,
        payload: errors
    }
}

export const addSectionRequest = () => {
    return{
        type: SECTIONS.ADD_SECTION_REQUEST
    }
}

export const addSectionSuccess = section => {
    return{
        type: SECTIONS.ADD_SECTION_SUCCESS,
        payload: section
    }
}

export const addSectionError = errors => {
    return{
        type: SECTIONS.ADD_SECTION_ERROR,
        payload: errors
    }
}

export const deleteSectionSuccess = id => {
    return{
        type: SECTIONS.DELETE_SECTION_SUCCESS,
        payload: id
    }
}

export const deleteSectionError = errors => {
    return{
        type: SECTIONS.DELETE_SECTION_ERROR,
        payload: errors
    }
}

export const clearSectionErrors = () => {
    return{
        type: SECTIONS.CLEAR_SECTION_ERRORS
    }
}