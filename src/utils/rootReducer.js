import { combineReducers } from "redux";
import SignUpReducer from "../pages/signUp/state/SignUpSlice";
import LoginReducer from "../pages/login/state/LoginSlice";
import CommonReducer from "../common/state/CommonSlice";

const rootReducer = combineReducers({
    SignUpReducer,
    LoginReducer,
    CommonReducer,
});

export default rootReducer;
