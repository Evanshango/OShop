import {applyMiddleware, combineReducers, createStore} from 'redux'
import {composeWithDevTools} from "redux-devtools-extension"
import thunk from 'redux-thunk'
import authReducer from "./auth/authReducer";
import sectionReducer from "./sections/sectionReducer";
import productReducer from "./products/productReducer";
import addressReducer from "./address/addressReducer";
import cartReducer from "./cart/cartReducer";
import checkoutReducer from "./checkout/checkoutReducer";
import orderReducer from "./orders/orderReducer";
import offerReducer from "./offers/offerReducer";
import productItemReducer from "./product/productReducer";
import userReducer from "./user/userReducer";

const initialState = {}
const middleware = [thunk]

const rootReducer = combineReducers({
    auth: authReducer,
    current: userReducer,
    section: sectionReducer,
    product: productReducer,
    address: addressReducer,
    cart: cartReducer,
    checkout: checkoutReducer,
    order: orderReducer,
    offer: offerReducer,
    item: productItemReducer
})

const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store