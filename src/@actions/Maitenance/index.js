import { alertActions, request, callback } from "../";
import { maintenanceService } from "../../@services";
import { MaintenanceTypes, MachinesTypes } from "../../@types";
import { modalActions } from "../Modal";

export const maintenanceActions = {
    getMaitenances,
    getMaitenanceTypes,
    createMaitenanceType,
    createMaitenance,
    updateMaitenanceTypes,
    updateMaitenance,
    completeMaitenance,
    deleteMaintenanceType,
    deleteMaintenance,
};

function getMaitenances() {
    return (dispatch) => {
        dispatch(request(MaintenanceTypes.GETMAITENANCES_REQUEST));

        maintenanceService
            .getMaintenances()
            .then((res) => {
                if (res.data.status) {
                    dispatch(
                        callback(
                            MaintenanceTypes.GETMAITENANCES_SUCCESS,
                            res.data
                        )
                    );
                } else {
                    dispatch(
                        alertActions.showAlert({
                            type: "failure",
                            message: res.data.message,
                        })
                    );
                }
            })
            .catch((err) => {
                if (err.response) {
                    dispatch(
                        alertActions.showAlert({
                            type: "failure",
                            message: err.response.data.message,
                        })
                    );
                } else {
                    dispatch(
                        alertActions.showAlert({
                            type: "failure",
                            message:
                                "Ha ocurrido un error, por favor intentalo nuevamente.",
                        })
                    );
                }
            });
    };
}

function getMaitenanceTypes() {
    return (dispatch) => {
        dispatch(request(MaintenanceTypes.GETMAITENANCETYPES_REQUEST));

        maintenanceService
            .getMaintenanceTypes()
            .then((res) => {
                if (res.data.status) {
                    dispatch(
                        callback(
                            MaintenanceTypes.GETMAITENANCETYPES_SUCCESS,
                            res.data
                        )
                    );
                } else {
                    dispatch(
                        alertActions.showAlert({
                            type: "failure",
                            message: res.data.message,
                        })
                    );
                }
            })
            .catch((err) => {
                if (err.response) {
                    dispatch(
                        alertActions.showAlert({
                            type: "failure",
                            message: err.response.data.message,
                        })
                    );
                } else {
                    dispatch(
                        alertActions.showAlert({
                            type: "failure",
                            message:
                                "Ha ocurrido un error, por favor intentalo nuevamente.",
                        })
                    );
                }
            });
    };
}

function createMaitenanceType(data) {
    return (dispatch) => {
        dispatch(request(MaintenanceTypes.CREATEMAITENANCETYPE_REQUEST));

        maintenanceService
            .createMaintenanceType(data)
            .then((res) => {
                if (res.data.status) {
                    dispatch(
                        callback(
                            MaintenanceTypes.GETMAITENANCETYPES_SUCCESS,
                            res.data
                        )
                    );
                    dispatch(modalActions.closeModal());
                    dispatch(
                        alertActions.showAlert({
                            type: "success",
                            message: res.data.message,
                        })
                    );
                } else {
                    dispatch(
                        alertActions.showAlert({
                            type: "failure",
                            message: res.data.message,
                        })
                    );
                }
            })
            .catch((err) => {
                if (err.response) {
                    dispatch(
                        alertActions.showAlert({
                            type: "failure",
                            message: err.response.data.message,
                        })
                    );
                } else {
                    dispatch(
                        alertActions.showAlert({
                            type: "failure",
                            message:
                                "Ha ocurrido un error, por favor intentalo nuevamente.",
                        })
                    );
                }
            });
    };
}

function createMaitenance(data) {
    return (dispatch) => {
        dispatch(request(MaintenanceTypes.CREATEMAITENANCE_REQUEST));

        maintenanceService
            .createMaintenance(data)
            .then((res) => {
                if (res.data.status) {
                    dispatch(
                        callback(
                            MaintenanceTypes.GETMAITENANCES_SUCCESS,
                            res.data
                        )
                    );
                    dispatch(modalActions.closeModal());
                    dispatch(
                        alertActions.showAlert({
                            type: "success",
                            message: res.data.message,
                        })
                    );
                } else {
                    dispatch(
                        alertActions.showAlert({
                            type: "failure",
                            message: res.data.message,
                        })
                    );
                }
            })
            .catch((err) => {
                if (err.response) {
                    dispatch(
                        alertActions.showAlert({
                            type: "failure",
                            message: err.response.data.message,
                        })
                    );
                } else {
                    dispatch(
                        alertActions.showAlert({
                            type: "failure",
                            message:
                                "Ha ocurrido un error, por favor intentalo nuevamente.",
                        })
                    );
                }
            });
    };
}

function updateMaitenanceTypes(data) {
    return (dispatch) => {
        dispatch(request(MaintenanceTypes.UPDATEMAITENANCETYPES_REQUEST));

        maintenanceService
            .updateMaintenanceTypes(data)
            .then((res) => {
                if (res.data.status) {
                    dispatch(
                        callback(MaintenanceTypes.GETMAITENANCETYPES_SUCCESS, {
                            ...res.data,
                            edit: true,
                        })
                    );
                    dispatch(
                        alertActions.showAlert({
                            type: "success",
                            message: res.data.message,
                        })
                    );
                } else {
                    dispatch(
                        alertActions.showAlert({
                            type: "failure",
                            message: res.data.message,
                        })
                    );
                }
            })
            .catch((err) => {
                if (err.response) {
                    dispatch(
                        alertActions.showAlert({
                            type: "failure",
                            message: err.response.data.message,
                        })
                    );
                } else {
                    dispatch(
                        alertActions.showAlert({
                            type: "failure",
                            message:
                                "Ha ocurrido un error, por favor intentalo nuevamente.",
                        })
                    );
                }
            });
    };
}

function updateMaitenance(data) {
    return (dispatch) => {
        dispatch(request(MaintenanceTypes.UPDATEMAITENANCE_REQUEST));

        maintenanceService
            .updateMaintenance(data)
            .then((res) => {
                if (res.data.status) {
                    dispatch(
                        callback(MaintenanceTypes.GETMAITENANCES_SUCCESS, {
                            ...res.data,
                            edit: true,
                        })
                    );
                    dispatch(
                        alertActions.showAlert({
                            type: "success",
                            message: res.data.message,
                        })
                    );
                } else {
                    dispatch(
                        alertActions.showAlert({
                            type: "failure",
                            message: res.data.message,
                        })
                    );
                }
            })
            .catch((err) => {
                if (err.response) {
                    dispatch(
                        alertActions.showAlert({
                            type: "failure",
                            message: err.response.data.message,
                        })
                    );
                } else {
                    dispatch(
                        alertActions.showAlert({
                            type: "failure",
                            message:
                                "Ha ocurrido un error, por favor intentalo nuevamente.",
                        })
                    );
                }
            });
    };
}

function completeMaitenance(_id) {
    return (dispatch) => {
        dispatch(request(MaintenanceTypes.COMPLETEMAITENANCE_REQUEST));

        maintenanceService
            .completeMaitenance(_id)
            .then((res) => {
                if (res.data.status) {
                    dispatch(
                        callback(MachinesTypes.GETMACHINES_SUCCESS, {
                            ...res.data,
                            completeMaitenance: true,
                        })
                    );
                    dispatch(
                        alertActions.showAlert({
                            type: "success",
                            message: res.data.message,
                        })
                    );
                } else {
                    dispatch(
                        alertActions.showAlert({
                            type: "failure",
                            message: res.data.message,
                        })
                    );
                }
            })
            .catch((err) => {
                if (err.response) {
                    dispatch(
                        alertActions.showAlert({
                            type: "failure",
                            message: err.response.data.message,
                        })
                    );
                } else {
                    dispatch(
                        alertActions.showAlert({
                            type: "failure",
                            message:
                                "Ha ocurrido un error, intentalo nuevamente",
                        })
                    );
                }
            });
    };
}

function deleteMaintenanceType(_id) {
    return (dispatch) => {
        dispatch(request(MaintenanceTypes.DELETEMAITENANCETYPE_REQUEST));

        maintenanceService
            .deleteMaintenanceType(_id)
            .then((res) => {
                if (res.data.status) {
                    dispatch(
                        callback(MaintenanceTypes.GETMAITENANCETYPES_SUCCESS, {
                            delete: true,
                            _id,
                            status: res.data.status,
                            message: res.data.message,
                        })
                    );
                    dispatch(
                        alertActions.showAlert({
                            type: "success",
                            message: res.data.message,
                        })
                    );
                } else {
                    dispatch(
                        alertActions.showAlert({
                            type: "failure",
                            message: res.data.message,
                        })
                    );
                }
            })
            .catch((err) => {
                if (err.response) {
                    dispatch(
                        alertActions.showAlert({
                            type: "failure",
                            message: err.response.data.message,
                        })
                    );
                } else {
                    dispatch(
                        alertActions.showAlert({
                            type: "failure",
                            message:
                                "Ha ocurrido un error, por favor intentalo nuevamente.",
                        })
                    );
                }
            });
    };
}

function deleteMaintenance(_id) {
    return (dispatch) => {
        dispatch(request(MaintenanceTypes.DELETEMAITENANCE_REQUEST));

        maintenanceService
            .deleteMaintenance(_id)
            .then((res) => {
                if (res.data.status) {
                    dispatch(
                        callback(MaintenanceTypes.GETMAITENANCES_SUCCESS, {
                            delete: true,
                            _id,
                            status: res.data.status,
                            message: res.data.message,
                        })
                    );
                    dispatch(
                        alertActions.showAlert({
                            type: "success",
                            message: res.data.message,
                        })
                    );
                } else {
                    dispatch(
                        alertActions.showAlert({
                            type: "failure",
                            message: res.data.message,
                        })
                    );
                }
            })
            .catch((err) => {
                if (err.response) {
                    dispatch(
                        alertActions.showAlert({
                            type: "failure",
                            message: err.response.data.message,
                        })
                    );
                } else {
                    dispatch(
                        alertActions.showAlert({
                            type: "failure",
                            message:
                                "Ha ocurrido un error, por favor intentalo nuevamente.",
                        })
                    );
                }
            });
    };
}
