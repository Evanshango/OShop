import {CHECKOUT} from "../types";

const initialState = {
    checkout: {}
}

const checkoutReducer = (state = initialState, action) => {
    switch (action.type){
        case CHECKOUT.ADD_PARAM:
            return{
                ...state, checkout: action.payload
            }
        default:
            return state
    }
}

export default checkoutReducer