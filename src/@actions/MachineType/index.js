import { alertActions, request, callback, modalActions } from "../";
import { machineTypeService } from "../../@services";
import { MachinesTypeTypes } from "../../@types";

export const machineTypeActions = {
    getMachineTypes,
    createMachineType,
    updateMachineType,
    deleteMachineType,
};

function getMachineTypes() {
    return (dispatch) => {
        dispatch(request(MachinesTypeTypes.GETMACHINETYPES_REQUEST));

        machineTypeService
            .getMachineTypes()
            .then((res) => {
                if (res.data.status) {
                    dispatch(
                        callback(MachinesTypeTypes.GETMACHINETYPES_SUCCESS, res.data)
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

function createMachineType(data) {
    return (dispatch) => {
        dispatch(request(MachinesTypeTypes.CREATEMACHINETYPE_REQUEST));

        machineTypeService
            .createMachineType(data)
            .then((res) => {
                if (res.data.status) {
                    dispatch(
                        callback(MachinesTypeTypes.GETMACHINETYPES_SUCCESS, res.data)
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

function updateMachineType(data) {
    return (dispatch) => {
        dispatch(request(MachinesTypeTypes.UPDATEMACHINETYPE_REQUEST));

        machineTypeService
            .updateMachineType(data)
            .then((res) => {
                if (res.data.status) {
                    dispatch(
                        callback(MachinesTypeTypes.GETMACHINETYPES_SUCCESS, {
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

function deleteMachineType(_id) {
    return (dispatch) => {
        dispatch(request(MachinesTypeTypes.DELETEMACHINETYPE_REQUEST));

        machineTypeService
            .deleteMachineType(_id)
            .then((response) => {
                if (response.data.status) {
                    dispatch(
                        callback(MachinesTypeTypes.GETMACHINETYPES_SUCCESS, {
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
