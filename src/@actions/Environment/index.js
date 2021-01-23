import { EnvironmentTypes } from "../../@types";
import { environmentService } from "../../@services";
import { alertActions, modalActions } from "../";
import { request, callback } from "../";

export const environmentActions = {
    getEnvironments,
    getEnvironment,
    createEnvironment,
    updateEnvironment,
    deleteEnvironment,
};

function getEnvironments() {
    return (dispatch) => {
        dispatch(request(EnvironmentTypes.GETENVIRONMENTS_REQUEST));

        environmentService
            .getEnvironments()
            .then((response) => {
                if (response.data.status) {
                    dispatch(
                        callback(
                            EnvironmentTypes.GETENVIRONMENTS_SUCCESS,
                            response.data
                        )
                    );
                } else {
                    dispatch(
                        callback(
                            EnvironmentTypes.GETENVIRONMENTS_FAILURE,
                            response.data
                        )
                    );
                }
            })
            .catch((err) => {
                dispatch(
                    callback(
                        EnvironmentTypes.GETENVIRONMENTS_FAILURE,
                        err.response.data
                    )
                );
            });
    };
}

function getEnvironment(_id) {
    return (dispatch) => {
        dispatch(request(EnvironmentTypes.GETENVIRONMENT_REQUEST));

        environmentService
            .getEnvironment(_id)
            .then((response) => {
                if (response.data.status) {
                    dispatch(
                        callback(
                            EnvironmentTypes.GETENVIRONMENT_SUCCESS,
                            response
                        )
                    );
                } else {
                    dispatch(
                        callback(
                            EnvironmentTypes.GETENVIRONMENT_FAILURE,
                            response
                        )
                    );
                }
            })
            .catch((err) => {
                dispatch(
                    callback(EnvironmentTypes.GETENVIRONMENTS_FAILURE, err)
                );
            });
    };
}

function createEnvironment(_data) {
    return (dispatch) => {
        dispatch(request(EnvironmentTypes.CREATEENVIRONMENT_REQUEST));

        environmentService
            .createEnvironment(_data)
            .then((response) => {
                if (response.data.status) {
                    dispatch(
                        callback(
                            EnvironmentTypes.GETENVIRONMENTS_SUCCESS,
                            response.data
                        )
                    );
                    dispatch(modalActions.closeModal());
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
                dispatch(
                    alertActions.showAlert({
                        type: "failure",
                        message: err.response.data.message,
                    })
                );
            });
    };
}

function updateEnvironment(_environment) {
    return (dispatch) => {
        dispatch(request(EnvironmentTypes.UPDATEENVIRONMENT_REQUEST));

        environmentService
            .updateEnvironment(_environment)
            .then((response) => {
                if (response.data.status) {
                    dispatch(
                        callback(EnvironmentTypes.GETENVIRONMENTS_SUCCESS, {
                            ...response.data,
                            edit: true,
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
                dispatch(
                    alertActions.showAlert({
                        type: "failure",
                        message: err.response.data.message,
                    })
                );
            });
    };
}

function deleteEnvironment(_id) {
    return (dispatch) => {
        dispatch(request(EnvironmentTypes.DELETEENVIRONMENT_REQUEST));
        environmentService
            .deleteEnvironment(_id)
            .then((response) => {
                if (response.data.status) {
                    dispatch(
                        callback(EnvironmentTypes.GETENVIRONMENTS_SUCCESS, {
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
