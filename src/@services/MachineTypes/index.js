import axios from "axios";
import { cookieHelper } from "../../helpers";

export const machineTypeService = {
    getMachineTypes,
    createMachineType,
    updateMachineType,
    deleteMachineType,
};

function getMachineTypes() {
    const configuration = {
        method: "get",
        headers: {
            Authorization: cookieHelper.getCookie("user"),
        },
        url: process.env.REACT_APP_API + "machineType/getMachineTypes",
    };

    return axios.request(configuration);
}

function createMachineType(data) {
    const configuration = {
        method: "post",
        headers: {
            Authorization: cookieHelper.getCookie("user"),
        },
        data,
        url: process.env.REACT_APP_API + "machineType/createMachineType",
    };

    return axios.request(configuration);
}

function updateMachineType(data) {
    const configuration = {
        method: "put",
        headers: {
            Authorization: cookieHelper.getCookie("user"),
        },
        data,
        url: process.env.REACT_APP_API + "machineType/updateMachineType",
    };

    return axios.request(configuration);
}

function deleteMachineType(_id) {
    const configuration = {
        method: "delete",
        headers: {
            Authorization: cookieHelper.getCookie("user"),
        },
        data: {
            machineTypeID: _id,
        },
        url: process.env.REACT_APP_API + "machineType/deleteMachineType",
    };

    return axios.request(configuration);
}
