import {ORGANIZATION, USER} from "../types"

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

export const activateOrgRequest = () => {
    return {
        type: ORGANIZATION.ACTIVATE_ORG_REQUEST
    }
}

export const activateOrgSuccess = message => {
    return {
        type: ORGANIZATION.ACTIVATE_ORG_SUCCESS,
        payload: message
    }
}

export const activateOrgError = errors => {
    return {
        type: ORGANIZATION.ACTIVATE_ORG_ERROR,
        payload: errors
    }
}

export const clearOrgError = () => {
    return {
        type: ORGANIZATION.CLEAR_ORG_ERRORS
    }
}

export const fetchOrgUsersReq = () => {
    return {
        type: USER.FETCH_ORG_USERS_REQUEST
    }
}

export const fetchOrgUsersSuccess = users => {
    return {
        type: USER.FETCH_ORG_USERS_SUCCESS,
        payload: users
    }
}

export const fetchOrgUsersErrors = errors => {
    return {
        type: USER.FETCH_ORG_USERS_ERRORS,
        payload: errors
    }
}

export const addOrgUserReq = () => {
    return {
        type: USER.ADD_USER_ORG_REQUEST
    }
}

export const addOrgUserSuccess = user => {
    return {
        type: USER.ADD_USER_ORG_SUCCESS,
        payload: user
    }
}

export const addOrgUserError = errors => {
    return {
        type: USER.ADD_USER_ORG_ERROR,
        payload: errors
    }
}

export const clearAddUserOrgErrors = () => {
    return {
        type: USER.CLEAR_ADD_USER_ERRORS
    }
}
