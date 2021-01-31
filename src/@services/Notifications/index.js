import axios from "axios";
import { cookieHelper } from "../../helpers";

export const notificationService = {
    getNotifications,
    completeNotification,
};

function getNotifications() {
    const configuration = {
        method: "get",
        headers: {
            Authorization: cookieHelper.getCookie("user"),
        },
        url: process.env.REACT_APP_API + "notification/getNotifications",
    };

    return axios.request(configuration);
}

function completeNotification(_id) {
    const configuration = {
        method: "delete",
        headers: {
            Authorization: cookieHelper.getCookie("user"),
        },
        data: {
            notificationID: _id,
        },
        url: process.env.REACT_APP_API + "notification/completeNotification",
    };

    return axios.request(configuration);
}
