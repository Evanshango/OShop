import {applyMiddleware, combineReducers, createStore} from 'redux'
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
import {composeWithDevTools} from "redux-devtools-extension";
import paypalReducer from "./paypal/paypalReducer";

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
    item: productItemReducer,
    paypal: paypalReducer
})

const {NODE_ENV} = process.env

const devTools = NODE_ENV === "production" ? (
    applyMiddleware(...middleware)
) : (
    composeWithDevTools(applyMiddleware(...middleware))
);

const store = createStore(rootReducer, initialState, devTools);

export default store