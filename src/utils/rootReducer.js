import { combineReducers } from "redux";
import SignUpReducer from "../pages/signUp/state/SignUpSlice";
import LoginReducer from "../pages/login/state/LoginSlice";

const rootReducer = combineReducers({
    SignUpReducer,
    LoginReducer,
});

export default rootReducer;
