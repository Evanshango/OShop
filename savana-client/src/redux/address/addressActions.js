import {ADDRESSES} from "../types";

export const fetchAddressesRequest = () => {
    return {
        type: ADDRESSES.FETCH_ADDRESS_REQUEST
    }
}

export const fetchAddressesSuccess = addresses => {
    return {
        type: ADDRESSES.FETCH_ADDRESS_SUCCESS,
        payload: addresses
    }
}

export const fetchAddressesError = errors => {
    return {
        type: ADDRESSES.FETCH_ADDRESS_ERROR,
        payload: errors
    }
}

export const addAddressRequest = () => {
    return {
        type: ADDRESSES.ADD_ADDRESS_REQUEST
    }
}

export const addAddressSuccess = address => {
    return {
        type: ADDRESSES.ADD_ADDRESS_SUCCESS,
        payload: address
    }
}

export const addAddressError = errors => {
    return {
        type: ADDRESSES.ADD_ADDRESS_ERROR,
        payload: errors
    }
}

export const clearAddressErrors = () => {
    return {
        type: ADDRESSES.CLEAR_ADDRESS_ERROR
    }
}