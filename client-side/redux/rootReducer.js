import {combineReducers} from "redux";
import authReducer from "./auth/authReducer";
import cartReducer from "./cart/cartReducer";
import sectionReducer from "./sections/sectionReducer";
import productReducer from "./products/productReducer";
import orderReducer from "./orders/orderReducer";

const rootReducer = combineReducers({
    user: authReducer,
    sections: sectionReducer,
    products: productReducer,
    cart: cartReducer,
    orders: orderReducer
})

export default rootReducer
