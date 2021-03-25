import {OFFERS} from "../types";

const initialState = {
    loading: false,
    offers: [],
    errors: []
}

const offerReducer = (state = initialState, action) => {
    switch (action.type) {
        case OFFERS.FETCH_OFFER_REQUEST:
            return {
                ...state, loading: true
            }
        case OFFERS.FETCH_OFFER_SUCCESS:
            return {
                ...state, loading: false, errors: [], offers: action.payload
            }
        case OFFERS.FETCH_OFFER_ERROR:
            return {
                ...state, errors: action.payload, loading: false, offers: []
            }
        case OFFERS.ADD_OFFER_REQUEST:
            return {
                ...state, loading: true
            }
        case OFFERS.ADD_OFFER_SUCCESS:
            return {
                ...state, errors: [], loading: false, offers: [...state.offers, action.payload]
            }
        case OFFERS.ADD_OFFER_ERROR:
            return {
                ...state, errors: action.payload, loading: false
            }
        case OFFERS.DELETE_OFFER_REQUEST:
            return {
                ...state, loading: true
            }
        case OFFERS.DELETE_OFFER_SUCCESS:
            return {
                ...state, offers: state.offers.filter(offer => offer.id !== action.payload), errors: [], loading: false
            }
        case OFFERS.DELETE_OFFER_ERROR:
            return {
                ...state, loading: false, errors: action.payload
            }
        case OFFERS.CLEAR_OFFER_ERROR:
            return {
                ...state, errors: []
            }
        default:
            return state
    }
}

export default offerReducer