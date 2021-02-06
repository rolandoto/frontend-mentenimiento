import axios from "axios";
import { cookieHelper } from "../../helpers";

export const sparePartsService = {
    getSpareParts,
    createSparePart,
    updateSparePart,
    assignSparePartToMachine,
};

function getSpareParts() {
    const configuration = {
        method: "get",
        headers: {
            Authorization: cookieHelper.getCookie("user"),
        },
        url: process.env.REACT_APP_API + "sparePart/getSpareParts",
    };

    return axios.request(configuration);
}

function createSparePart(data) {
    const configuration = {
        method: "post",
        headers: {
            Authorization: cookieHelper.getCookie("user"),
        },
        data,
        url: process.env.REACT_APP_API + "sparePart/createSparePart",
    };

    return axios.request(configuration);
}

function updateSparePart(data) {
    const configuration = {
        method: "put",
        headers: {
            Authorization: cookieHelper.getCookie("user"),
        },
        data,
        url: process.env.REACT_APP_API + "sparePart/updateSparePart",
    };

    return axios.request(configuration);
}

function assignSparePartToMachine(data) {
    const configuration = {
        method: "put",
        headers: {
            Authorization: cookieHelper.getCookie("user"),
        },
        data,
        url: process.env.REACT_APP_API + "sparePart/assignSparePartToMachine",
    };

    return axios.request(configuration);
}
