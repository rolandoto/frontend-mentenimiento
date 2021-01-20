import { AlertTypes } from "../../@types";

export const alertActions = {
    showAlert,
    hideAlert,
};

function showAlert({ type, message }) {
    return (dispatch) => {
        dispatch({
            type: AlertTypes.SHOW_ALERT,
            manage: type,
            message,
        });
    };
}

function hideAlert() {
    return (dispatch) => {
        dispatch({
            type: AlertTypes.HIDE_ALERT,
        });
    };
}
