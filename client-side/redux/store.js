import {createStore, compose, applyMiddleware} from "redux";
import {composeWithDevTools} from "redux-devtools-extension"
import {createWrapper} from "next-redux-wrapper";
import rootReducer from "./rootReducer";
import thunk from "redux-thunk";

const middleware = [thunk]

const makeStore = () => createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleware)))

export const wrapper = createWrapper(makeStore)