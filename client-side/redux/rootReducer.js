import {combineReducers} from "redux";
import authReducer from "./reducers/authReducer";

const rootReducer = combineReducers({
    user: authReducer
})

export default rootReducer
