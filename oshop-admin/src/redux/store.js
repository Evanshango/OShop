import {applyMiddleware, combineReducers, createStore} from 'redux'
import {composeWithDevTools} from "redux-devtools-extension"
import thunk from 'redux-thunk'
import authReducer from "./auth/authReducer";
import sectionReducer from "./sections/sectionReducer";
import categoryReducer from "./categories/categoryReducer";
import productReducer from "./products/productReducer";

const initialState = {}
const middleware = [thunk]

const rootReducer = combineReducers({
    user: authReducer,
    sections: sectionReducer,
    categories: categoryReducer,
    products: productReducer
})

const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store