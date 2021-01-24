import { combineReducers } from "redux";
import { AuthReducer } from "./User";
import { ModalReducer, ModalDetailReducer } from "./Modal";
import { AlertReducer } from "./Alert";
import { EnvironmentsAllReducer } from "./Environments";
import { MachineAllReducer } from "./Machine";
import { UserTypes } from "../@types";

const rootReducer = combineReducers({
    AuthReducer,
    ModalReducer,
    AlertReducer,
    EnvironmentsAllReducer,
    MachineAllReducer,
    ModalDetailReducer,
});

const evalueReducer = (state, action) =>
    rootReducer(
        action.type === UserTypes.USER_LOGOUT ? undefined : state,
        action
    );

export default evalueReducer;
