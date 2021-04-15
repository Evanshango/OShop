import {applyMiddleware, combineReducers, createStore} from 'redux'
import {composeWithDevTools} from "redux-devtools-extension"
import thunk from 'redux-thunk'
import authReducer from "./auth/authReducer";
import sectionReducer from "./sections/sectionReducer";
import categoryReducer from "./categories/categoryReducer";
import productReducer from "./products/productReducer";
import orderReducer from "./orders/orderReducer";
import offerReducer from "./offers/offerReducer";
import organizationReducer from "./organization/organizationReducer"

const initialState = {}
const middleware = [thunk]

const rootReducer = combineReducers({
    organization: organizationReducer,
    user: authReducer,
    section: sectionReducer,
    category: categoryReducer,
    product: productReducer,
    order: orderReducer,
    offer: offerReducer
})

const {NODE_ENV} = process.env

const devTools = NODE_ENV === "production" ? (
    applyMiddleware(...middleware)
) : (
    composeWithDevTools(applyMiddleware(...middleware))
);

const store = createStore(rootReducer, initialState, devTools);

export default store
