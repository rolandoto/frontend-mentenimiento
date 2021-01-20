import { combineReducers } from "redux";
import { AuthReducer } from "./Login";
import { ModalReducer } from "./Modal";
import { AlertReducer } from "./Alert";
import { EnvironmentsAllReducer } from "./Environments";
import { LoginTypes } from "../@types";

const rootReducer = combineReducers({
    AuthReducer,
    ModalReducer,
    AlertReducer,
    EnvironmentsAllReducer,
});

const evalueReducer = (state, action) =>
    rootReducer(
        action.type === LoginTypes.USER_LOGOUT ? undefined : state,
        action
    );

export default evalueReducer;
