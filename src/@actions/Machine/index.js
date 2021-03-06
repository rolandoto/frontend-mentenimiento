import { alertActions, request, callback, modalActions } from "../";
import { machineService } from "../../@services";
import { MachinesTypes, ModalTypes } from "../../@types";

export const machineActions = {
    getMachines,
    getMachineNoAuth,
    createMachine,
    updateMachine,
    deleteMachine,
    registerMachineUse,
    updatePreconfiguredMaitenances,
    updateMachineMaintenanceTask,
    resetMachineHours,
    registerMachineIssue,
};

function getMachines() {
    return (dispatch) => {
        dispatch(request(MachinesTypes.GETMACHINES_REQUEST));

        machineService
            .getMachines()
            .then((res) => {
                if (res.data.status) {
                    dispatch(
                        callback(MachinesTypes.GETMACHINES_SUCCESS, res.data)
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
                                "Ha ocurrido un error al obtener el listado de maquinas, intentalo nuevamente",
                        })
                    );
                }
            });
    };
}

function getMachineNoAuth(_id) {
    return (dispatch) => {
        dispatch(request(MachinesTypes.GETMACHINE_REQUEST));

        machineService
            .getMachineNoAuth(_id)
            .then((res) => {
                if (res.data.status) {
                    dispatch(
                        callback(MachinesTypes.GETMACHINE_SUCCESS, res.data)
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

function createMachine(data) {
    return (dispatch) => {
        dispatch(request(MachinesTypes.CREATEMACHINE_REQUEST));

        machineService
            .createMachine(data)
            .then((res) => {
                if (res.data.status) {
                    dispatch(
                        callback(MachinesTypes.GETMACHINES_SUCCESS, res.data)
                    );
                    dispatch(
                        alertActions.showAlert({
                            type: "success",
                            message: res.data.message,
                        })
                    );
                    dispatch(modalActions.closeModal());
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

function registerMachineUse(data) {
    return (dispatch) => {
        machineService
            .registerMachineUse(data)
            .then((res) => {
                if (res.data.status) {
                    dispatch(
                        callback(MachinesTypes.GETMACHINE_SUCCESS, res.data)
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

function registerMachineIssue(data) {
    return (dispatch) => {
        machineService
            .registerMachineIssue(data)
            .then((res) => {
                if (res.data.status) {
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

function updateMachine(data) {
    return (dispatch) => {
        dispatch(request(MachinesTypes.UPDATEMACHINE_REQUEST));

        machineService
            .updateMachine(data)
            .then((res) => {
                if (res.data.status) {
                    dispatch(
                        callback(MachinesTypes.GETMACHINES_SUCCESS, {
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
                                "Ha ocurrido un error, intentalo nuevamente",
                        })
                    );
                }
            });
    };
}

function updateMachineMaintenanceTask(data) {
    return (dispatch) => {
        dispatch(request(MachinesTypes.UPDATEMACHINEMAINTENANCETASK_REQUEST));

        machineService
            .completeCheckListTask(data)
            .then((res) => {
                if (res.data.status) {
                    dispatch(
                        callback(MachinesTypes.GETMACHINES_SUCCESS, {
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
                                "Ha ocurrido un error, intentalo nuevamente",
                        })
                    );
                }
            });
    };
}

function resetMachineHours(machineID) {
    return (dispatch) => {
        dispatch(request(MachinesTypes.RESETMACHINEHOURS_REQUEST));

        machineService
            .resetMachineHours(machineID)
            .then((res) => {
                if (res.data.status) {
                    dispatch(
                        callback(MachinesTypes.GETMACHINES_SUCCESS, {
                            ...res.data,
                            edit: true,
                        })
                    );
                    dispatch({
                        type: ModalTypes.SHOW_MODAL_DETAIL,
                        item: res.data.updatedMachine,
                        component: "MachineDetails",
                        size: false,
                    });
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

function updatePreconfiguredMaitenances(data) {
    return (dispatch) => {
        dispatch(request(MachinesTypes.UPDATEMACHINEMAITENANCES_REQUEST));

        machineService
            .updatePreconfiguredMaitenances(data)
            .then((res) => {
                if (res.data.status) {
                    dispatch(
                        callback(MachinesTypes.GETMACHINES_SUCCESS, {
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
                                "Ha ocurrido un error, intentalo nuevamente",
                        })
                    );
                }
            });
    };
}

function deleteMachine(_id) {
    return (dispatch) => {
        dispatch(request(MachinesTypes.DELETEMACHINE_REQUEST));
        machineService
            .deleteMachine(_id)
            .then((response) => {
                if (response.data.status) {
                    dispatch(
                        callback(MachinesTypes.GETMACHINES_SUCCESS, {
                            delete: true,
                            _id,
                            status: response.data.status,
                            message: response.data.message,
                        })
                    );
                    dispatch(
                        alertActions.showAlert({
                            type: "success",
                            message: response.data.message,
                        })
                    );
                } else {
                    dispatch(
                        alertActions.showAlert({
                            type: "failure",
                            message: response.data.message,
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
