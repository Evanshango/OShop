import {combineReducers} from "redux";
import authReducer from "./auth/authReducer";
import cartReducer from "./cart/cartReducer";
import sectionReducer from "./sections/sectionReducer";
import productReducer from "./products/productReducer";

const rootReducer = combineReducers({
    user: authReducer,
    sections: sectionReducer,
    cart: cartReducer,
    products: productReducer
})

export default rootReducer
