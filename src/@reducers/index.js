import { combineReducers } from "redux";
import { AuthReducer } from "./Login";
import { LoginTypes } from "../@types";

const rootReducer = combineReducers({
    AuthReducer,
});

const evalueReducer = (state, action) =>
    rootReducer(
        action.type === LoginTypes.USER_LOGOUT ? undefined : state,
        action
    );

export default evalueReducer;
