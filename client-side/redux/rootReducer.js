import {combineReducers} from "redux";
import authReducer from "./auth/authReducer";
import cartReducer from "./cart/cartReducer";
import sectionReducer from "./sections/sectionReducer";
import productReducer from "./products/productReducer";
import orderReducer from "./orders/orderReducer";
import addressReducer from "./address/addressReducer";
import checkoutReducer from "./checkout/checkoutReducer";

const rootReducer = combineReducers({
    user: authReducer,
    section: sectionReducer,
    product: productReducer,
    addresses: addressReducer,
    cart: cartReducer,
    checkout: checkoutReducer,
    order: orderReducer
})

export default rootReducer