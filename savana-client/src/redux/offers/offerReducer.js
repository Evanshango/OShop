import {OFFERS} from "../types";

const initialState = {
    loading: false,
    offers: [],
    errors: []
}

const offerReducer = (state = initialState, action) => {
    switch (action.type) {
        case OFFERS.FETCH_OFFERS_REQUEST:
            return {
                ...state, loading: true
            }
        case OFFERS.FETCH_OFFERS_SUCCESS:
            return {
                ...state, loading: false, offers: action.payload, errors: []
            }
        case OFFERS.FETCH_OFFERS_ERROR:
            return {
                ...state, loading: false, offers: [], errors: action.payload
            }
        case OFFERS.CLEAR_OFFERS_ERROR:
            return {
                ...state, errors: []
            }
        default:
            return state
    }
}

export default offerReducer