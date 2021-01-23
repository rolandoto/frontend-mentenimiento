import axios from "axios";
import { cookieHelper } from "../../helpers";

export const machineService = {
    createMachine,
    getMachines,
    updateMachine,
    deleteMachine,
};

function getMachines() {
    const configuration = {
        method: "get",
        headers: {
            Authorization: cookieHelper.getCookie("user"),
        },
        url: process.env.REACT_APP_API + "machine/getMachines",
    };

    return axios.request(configuration);
}

function createMachine(data) {
    const configuration = {
        method: "post",
        headers: {
            Authorization: cookieHelper.getCookie("user"),
        },
        data,
        url: process.env.REACT_APP_API + "machine/createMachine",
    };

    return axios.request(configuration);
}

function updateMachine(data) {
    const configuration = {
        method: "put",
        headers: {
            Authorization: cookieHelper.getCookie("user"),
        },
        data,
        url: process.env.REACT_APP_API + "machine/updateMachine",
    };

    return axios.request(configuration);
}

function deleteMachine(_id) {
    const configuration = {
        method: "delete",
        headers: {
            Authorization: cookieHelper.getCookie("user"),
        },
        data: {
            machineID: _id,
        },
        url: process.env.REACT_APP_API + "machine/deleteMachine",
    };

    return axios.request(configuration);
}
