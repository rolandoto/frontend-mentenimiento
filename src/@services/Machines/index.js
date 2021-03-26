import axios from "axios";
import { cookieHelper } from "../../helpers";

export const machineService = {
    createMachine,
    getMachines,
    updateMachine,
    deleteMachine,
    getMachineNoAuth,
    registerMachineUse,
    updatePreconfiguredMaitenances,
};

function getMachineNoAuth(_id) {
    const configuration = {
        method: "get",
        headers: {
            Authorization: cookieHelper.getCookie("user"),
        },
        url: process.env.REACT_APP_API + "machine/getMachineNoAuth/" + _id,
    };

    return axios.request(configuration);
}

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

function registerMachineUse(data) {
    const configuration = {
        method: "post",
        headers: {
            Authorization: data.token,
        },
        data,
        url: process.env.REACT_APP_API + "machine/registerMachineUse",
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

function updatePreconfiguredMaitenances(data) {
    const configuration = {
        method: "put",
        headers: {
            Authorization: cookieHelper.getCookie("user"),
        },
        data,
        url:
            process.env.REACT_APP_API +
            "machine/updatePreconfiguredMaitenances",
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
