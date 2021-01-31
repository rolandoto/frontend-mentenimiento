import { callback, request } from "../";
import { NotificationTypes } from "../../@types";
import { notificationService } from "../../@services";
import { alertActions } from "../Alert";

export const notificationActions = {
    addNotification,
    getNotifications,
    completeNotification,
};

function getNotifications() {
    return (dispatch) => {
        dispatch(request(NotificationTypes.GETNOTIFICATIONS_REQUEST));

        notificationService
            .getNotifications()
            .then((res) => {
                if (res.data.status) {
                    dispatch(
                        callback(
                            NotificationTypes.GETNOTIFICATIONS_SUCCESS,
                            res.data
                        )
                    );
                } else {
                    dispatch(
                        alertActions.showAlert({
                            type: "failure",
                            message: res.data.message,
                        })
                    );
                }
            })
            .catch((_) => {
                dispatch(
                    alertActions.showAlert({
                        type: "failure",
                        message:
                            "Ha ocurrido un error al obtener las notificaciones.",
                    })
                );
            });
    };
}

function completeNotification(_id) {
    return (dispatch) => {
        dispatch(request(NotificationTypes.COMPLETENOTIFICATIONS_REQUEST));

        notificationService
            .completeNotification(_id)
            .then((res) => {
                if (res.data.status) {
                    dispatch(
                        callback(NotificationTypes.GETNOTIFICATIONS_SUCCESS, {
                            delete: true,
                            _id,
                        })
                    );
                    dispatch(
                        alertActions.showAlert({
                            type: "success",
                            message: res.data.message,
                        })
                    );
                } else {
                    dispatch(
                        alertActions.showAlert({
                            type: "failure",
                            message: res.data.message,
                        })
                    );
                }
            })
            .catch((err) => {
                if (err.response) {
                    dispatch(
                        alertActions.showAlert({
                            type: "failure",
                            message: err.response.data.message,
                        })
                    );
                } else {
                    dispatch(
                        alertActions.showAlert({
                            type: "failure",
                            message:
                                "Ha ocurrido un error al obtener las notificaciones.",
                        })
                    );
                }
            });
    };
}

function addNotification(data) {
    return (dispatch) => {
        dispatch(
            callback(NotificationTypes.GETNOTIFICATIONS_SUCCESS, {
                notification: data,
                add: true,
            })
        );
    };
}
