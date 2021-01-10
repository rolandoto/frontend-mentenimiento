import axios from "axios";

export const LoginService = {
    login,
    authenticate,
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
