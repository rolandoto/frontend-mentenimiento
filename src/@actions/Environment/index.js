import { EnvironmentTypes } from "../../@types";
import { environmentService } from "../../@services";
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
                            response
                        )
                    );
                } else {
                    dispatch(
                        callback(
                            EnvironmentTypes.GETENVIRONMENTS_FAILURE,
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

function createEnvironment(_environment) {
    return (dispatch) => {
        dispatch(request(EnvironmentTypes.CREATEENVIRONMENT_REQUEST));

        environmentService
            .createEnvironment(_environment)
            .then((response) => {
                if (response.data.status) {
                    dispatch(
                        callback(
                            EnvironmentTypes.CREATEENVIRONMENT_SUCCESS,
                            response
                        )
                    );
                } else {
                    dispatch(
                        callback(
                            EnvironmentTypes.CREATEENVIRONMENT_FAILURE,
                            response
                        )
                    );
                }
            })
            .catch((err) => {
                dispatch(
                    callback(EnvironmentTypes.CREATEENVIRONMENT_FAILURE, err)
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
                        callback(
                            EnvironmentTypes.UPDATEENVIRONMENT_SUCCESS,
                            response
                        )
                    );
                } else {
                    dispatch(
                        callback(
                            EnvironmentTypes.UPDATEENVIRONMENT_FAILURE,
                            response
                        )
                    );
                }
            })
            .catch((err) => {
                dispatch(
                    callback(EnvironmentTypes.UPDATEENVIRONMENT_FAILURE, err)
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
                        callback(
                            EnvironmentTypes.DELETEENVIRONMENT_SUCCESS,
                            response
                        )
                    );
                } else {
                    dispatch(
                        callback(
                            EnvironmentTypes.DELETEENVIRONMENT_FAILURE,
                            response
                        )
                    );
                }
            })
            .catch((err) => {
                dispatch(
                    callback(EnvironmentTypes.DELETEENVIRONMENT_FAILURE, err)
                );
            });
    };
}
