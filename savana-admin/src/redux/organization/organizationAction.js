import {ORGANIZATION} from "../types"

export const fetchOrgRequest = () => {
    return {
        type: ORGANIZATION.FETCH_ORG_REQUEST
    }
}

export const fetchOrgSuccess = organizations => {
    return {
        type: ORGANIZATION.FETCH_ORG_SUCCESS,
        payload: organizations
    }
}

export const fetchOrgError = errors => {
    return {
        type: ORGANIZATION.FETCH_ORG_ERROR,
        payload: errors
    }
}

export const addOrgRequest = () => {
    return {
        type: ORGANIZATION.ADD_ORG_REQUEST
    }
}

export const addOrgSuccess = organization => {
    return {
        type: ORGANIZATION.ADD_ORG_SUCCESS,
        payload: organization
    }
}

export const addOrgError = errors => {
    return {
        type: ORGANIZATION.ADD_ORG_ERROR,
        payload: errors
    }
}

export const editOrgRequest = () => {
    return {
        type: ORGANIZATION.EDIT_ORG_REQUEST
    }
}

export const editOrgSuccess = organization => {
    return {
        type: ORGANIZATION.EDIT_ORG_SUCCESS,
        payload: organization
    }
}

export const editOrgError = errors => {
    return {
        type: ORGANIZATION.EDIT_ORG_ERROR,
        payload: errors
    }
}

export const clearOrgError = () => {
    return {
        type: ORGANIZATION.CLEAR_ORG_ERRORS
    }
}
