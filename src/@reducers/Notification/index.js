import { NotificationTypes } from "../../@types";

function evaluateNotifications(state, action) {
    if (action.add) {
        return state.status
            ? state.notifications
                ? state.notifications.find(
                      (noti) => noti._id === action.notification._id
                  )
                    ? [...state.notifications]
                    : [...state.notifications, action.notification]
                : [action.notification]
            : [];
    } else {
        if (action.delete) {
            return state.status && state.notifications
                ? state.notifications.filter((noti) => {
                      return noti._id !== action._id;
                  })
                : state.notifications
                ? [state.notifications]
                : [];
        } else {
            return state.status
                ? [...state.notifications, ...action.notifications]
                : [...action.notifications];
        }
    }
}

export const notificationAllReducer = (state = {}, action) => {
    switch (action.type) {
        case NotificationTypes.GETNOTIFICATIONS_REQUEST:
            return {
                loading: true,
            };
        case NotificationTypes.GETNOTIFICATIONS_SUCCESS:
            const notifications = evaluateNotifications(state, action.response);
            return {
                status: true,
                notifications,
            };
        case NotificationTypes.GETNOTIFICATIONS_FAILURE:
            return {
                status: action.response.status,
                notifications: action.response.notifications,
            };
        default:
            return state;
    }
};
