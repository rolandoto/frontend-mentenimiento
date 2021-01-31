import axios from "axios";
import { cookieHelper } from "../../helpers";

export const maintenanceService = {
    getMaintenances,
    getMaintenanceTypes,
    createMaintenanceType,
    createMaintenance,
    completeMaitenance,
    updateMaintenanceTypes,
    deleteMaintenanceType,
    deleteMaintenance,
};

function getMaintenances() {
    const configuration = {
        method: "get",
        headers: {
            Authorization: cookieHelper.getCookie("user"),
        },
        url: process.env.REACT_APP_API + "maintenance/getMaintenances",
    };

    return axios.request(configuration);
}

function getMaintenanceTypes() {
    const configuration = {
        method: "get",
        headers: {
            Authorization: cookieHelper.getCookie("user"),
        },
        url: process.env.REACT_APP_API + "maintenanceType/getMaintenanceTypes",
    };

    return axios.request(configuration);
}

function createMaintenanceType(data) {
    const configuration = {
        method: "post",
        headers: {
            Authorization: cookieHelper.getCookie("user"),
        },
        data,
        url:
            process.env.REACT_APP_API + "maintenanceType/createMaintenanceType",
    };

    return axios.request(configuration);
}

function createMaintenance(data) {
    const configuration = {
        method: "post",
        headers: {
            Authorization: cookieHelper.getCookie("user"),
        },
        data,
        url: process.env.REACT_APP_API + "maintenance/createMaintenance",
    };

    return axios.request(configuration);
}

function updateMaintenanceTypes(data) {
    const configuration = {
        method: "put",
        headers: {
            Authorization: cookieHelper.getCookie("user"),
        },
        data,
        url:
            process.env.REACT_APP_API + "maintenanceType/updateMaintenanceType",
    };

    return axios.request(configuration);
}

function completeMaitenance(_id) {
    const configuration = {
        method: "put",
        headers: {
            Authorization: cookieHelper.getCookie("user"),
        },
        data: {
            maintenanceID: _id,
        },
        url: process.env.REACT_APP_API + "maintenance/completeMaintenance",
    };

    return axios.request(configuration);
}

function deleteMaintenanceType(_id) {
    const configuration = {
        method: "delete",
        headers: {
            Authorization: cookieHelper.getCookie("user"),
        },
        data: {
            maintenanceTypeID: _id,
        },
        url:
            process.env.REACT_APP_API + "maintenanceType/deleteMaintenanceType",
    };

    return axios.request(configuration);
}

function deleteMaintenance(_id) {
    const configuration = {
        method: "delete",
        headers: {
            Authorization: cookieHelper.getCookie("user"),
        },
        data: {
            maintenanceID: _id,
        },
        url: process.env.REACT_APP_API + "maintenance/deleteMaintenance",
    };

    return axios.request(configuration);
}
