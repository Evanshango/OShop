import {CHECKOUT} from "../types";

export const checkoutParams = checkout => {
    return{
        type: CHECKOUT.ADD_PARAM,
        payload: checkout
    }
}