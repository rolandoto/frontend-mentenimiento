import { combineReducers } from "redux";
import { AuthReducer, AuthMachineReducer } from "./User";
import { ModalReducer, ModalDetailReducer } from "./Modal";
import { AlertReducer } from "./Alert";
import { EnvironmentsAllReducer } from "./Environments";
import { MachineAllReducer, MachineOneReducer } from "./Machine";
import { MaitenanceTypesReducer, MaitenancesAllReducer } from "./Maintenance";
import { notificationAllReducer } from "./Notification";
import { UserTypes } from "../@types";

const rootReducer = combineReducers({
    AuthReducer,
    ModalReducer,
    AlertReducer,
    EnvironmentsAllReducer,
    MachineAllReducer,
    ModalDetailReducer,
    notificationAllReducer,
    MachineOneReducer,
    AuthMachineReducer,
    MaitenanceTypesReducer,
    MaitenancesAllReducer,
});

const evalueReducer = (state, action) =>
    rootReducer(
        action.type === UserTypes.USER_LOGOUT ? undefined : state,
        action
    );

export default evalueReducer;
