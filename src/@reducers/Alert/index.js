import { AlertTypes } from "../../@types";

export const AlertReducer = ( state = {}, action ) => {
    switch (action.type) {
        case AlertTypes.SHOW_ALERT:
            return {
                show: true,
                type: action.manage,
                message: action.message,
            };
        case AlertTypes.HIDE_ALERT:
            return {};
        default:
            return state;
    }
};
