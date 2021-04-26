import {OFFERS} from "../types";

export const fetchOffersRequest = () => {
    return {
        type: OFFERS.FETCH_OFFER_REQUEST
    }
}

export const fetchOffersSuccess = offers => {
    return {
        type: OFFERS.FETCH_OFFER_SUCCESS,
        payload: offers
    }
}

export const fetchOffersError = errors => {
    return {
        type: OFFERS.FETCH_OFFER_ERROR,
        payload: errors
    }
}

export const addOfferRequest = () => {
    return {
        type: OFFERS.ADD_OFFER_REQUEST
    }
}

export const addOfferSuccess = offer => {
    return {
        type: OFFERS.ADD_OFFER_SUCCESS,
        payload: offer
    }
}

export const addOfferError = errors => {
    return {
        type: OFFERS.ADD_OFFER_ERROR,
        payload: errors
    }
}

export const deleteOfferRequest = () => {
    return {
        type: OFFERS.DELETE_OFFER_REQUEST
    }
}

export const deleteOfferSuccess = id => {
    return {
        type: OFFERS.DELETE_OFFER_SUCCESS,
        payload: id
    }
}

export const deleteOfferError = errors => {
    return {
        type: OFFERS.DELETE_OFFER_ERROR,
        payload: errors
    }
}

export const clearOfferErrors = () => {
    return {
        type: OFFERS.CLEAR_OFFER_ERROR
    }
}