import axios from "axios";
import { cookieHelper } from "../../helpers";

export const UserService = {
    login,
    authenticate,
    updateUser,
};

async function login(user) {
    const configuration = {
        method: "post",
        url: process.env.REACT_APP_API + "user/login",
        data: user,
    };

    const request = await axios.request(configuration);
    return request;
}

async function authenticate(token) {
    const configuration = {
        method: "get",
        headers: {
            Authorization: token,
        },
        url: process.env.REACT_APP_API + "user/authenticate",
    };

    const request = await axios.request(configuration);
    return request;
}

async function updateUser(data) {
    const configuration = {
        method: "put",
        headers: {
            Authorization: cookieHelper.getCookie("user"),
        },
        data,
        url: process.env.REACT_APP_API + "user/updateUser",
    };
    const request = await axios.request(configuration);
    return request;
}
