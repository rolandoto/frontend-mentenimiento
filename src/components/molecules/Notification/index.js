import React, { useEffect } from "react";
import { Notifications as NotificationIcon, Check } from "@material-ui/icons";
import { socket } from "../../../helpers";
import { notificationActions } from "../../../@actions";
import { Dropdown } from "../";
import { useDispatch, useSelector } from "react-redux";

export const Notifications = (_) => {
    const dispatch = useDispatch();
    const notification = useSelector((state) => state.notificationAllReducer);

    useEffect(
        (_) => {
            dispatch(notificationActions.getNotifications());
            socket.on("notificationRecived", (data) => {
                dispatch(notificationActions.addNotification(data));
            });
        },
        [dispatch]
    );

    const completeNotification = (_id) => {
        dispatch(notificationActions.completeNotification(_id));
    };

    return (
        <Dropdown
            Icon={NotificationIcon}
            circleRed={
                notification.status && notification.notifications.length > 0
            }
            extraClass="icon_space_right"
            width={324}
        >
            {notification.status &&
                notification.notifications.length > 0 &&
                notification.notifications.map((noti, i) => (
                    <li key={i}>
                        <div className="rows notification_task">
                            <p className="col10 text_notification">
                                {noti.message}
                            </p>
                            <div
                                className="icon_check_task"
                                onClick={() => completeNotification(noti._id)}
                            >
                                <Check />
                            </div>
                        </div>
                    </li>
                ))}
            {((notification.status &&
                notification.notifications.length === 0) ||
                !notification.status) && (
                <li>
                    <div className="rows notification_task">
                        <p className="text_notification center_margin">
                            No hay notificaciones para mostrar.
                        </p>
                    </div>
                </li>
            )}
        </Dropdown>
    );
};
