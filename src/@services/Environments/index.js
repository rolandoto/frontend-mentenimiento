import axios from "axios";
import { cookieHelper } from "../../helpers";
export const environmentService = {
    getEnvironment,
    getEnvironments,
    createEnvironment,
    updateEnvironment,
    deleteEnvironment,
};

function getEnvironment(_id) {
    const configuration = {
        method: "get",
        headers: {
            Authorization: cookieHelper.getCookie("user"),
        },
        url: process.env.REACT_APP_API + "environment/getEnvironment/" + _id,
    };

    return axios.request(configuration);
}

function getEnvironments() {
    const configuration = {
        method: "get",
        headers: {
            Authorization: cookieHelper.getCookie("user"),
        },
        url: process.env.REACT_APP_API + "environment/getEnvironments",
    };

    return axios.request(configuration);
}

function createEnvironment(environment) {
    var config = {
        method: "post",
        url: process.env.REACT_APP_API + "environment/createEnvironment",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: cookieHelper.getCookie("user"),
        },
        data: environment,
    };

    return axios(config);
}

function updateEnvironment(environment) {
    const configuration = {
        method: "put",
        headers: {
            Authorization: cookieHelper.getCookie("user"),
        },
        data: environment,
        url: process.env.REACT_APP_API + "environment/updateEnvironment",
    };

    return axios.request(configuration);
}

function deleteEnvironment(_id) {
    const configuration = {
        method: "delete",
        headers: {
            Authorization: cookieHelper.getCookie("user"),
        },
        data: {
            environmentID: _id,
        },
        url: process.env.REACT_APP_API + "environment/deleteEnvironment",
    };

    return axios.request(configuration);
}
