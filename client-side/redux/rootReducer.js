import {combineReducers} from "redux";
import authReducer from "./reducers/authReducer";
import cartReducer from "./cart/cartReducer";

const rootReducer = combineReducers({
    user: authReducer,
    cart: cartReducer
})

export default rootReducer
