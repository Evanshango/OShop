import {OFFERS} from "../types";

export const fetchOffersRequest = () => {
    return{
        type: OFFERS.FETCH_OFFERS_REQUEST
    }
}

export const fetchOffersSuccess = offers => {
    return{
        type: OFFERS.FETCH_OFFERS_SUCCESS,
        payload: offers
    }
}

export const fetchOffersError = errors => {
    return{
        type: OFFERS.FETCH_OFFERS_ERROR,
        payload: errors
    }
}

export const clearOffersErrors = () => {
    return{
        type: OFFERS.CLEAR_OFFERS_ERROR
    }
}