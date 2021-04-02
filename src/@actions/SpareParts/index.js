import { alertActions, request, callback, modalActions } from "../";
import { sparePartsService } from "../../@services";
import { MachinesTypes, ModalTypes, SparePartsTypes } from "../../@types";

export const sparePartsActions = {
    getSpareParts,
    createSparePart,
    updateSparePart,
    assignSparePartStockToMachine,
    assignSparePartToMachine,
};

function getSpareParts() {
    return (dispatch) => {
        dispatch(request(SparePartsTypes.GETSPAREPARTS_REQUEST));

        sparePartsService
            .getSpareParts()
            .then((res) => {
                if (res.data.status) {
                    dispatch(
                        callback(
                            SparePartsTypes.GETSPAREPARTS_SUCCESS,
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
                                "Ha ocurrido un error al obtener el listado de maquinas, intentalo nuevamente",
                        })
                    );
                }
            });
    };
}

function createSparePart(data) {
    return (dispatch) => {
        dispatch(request(SparePartsTypes.CREATESPAREPART_REQUEST));

        sparePartsService
            .createSparePart(data)
            .then((res) => {
                if (res.data.status) {
                    dispatch(
                        callback(
                            SparePartsTypes.GETSPAREPARTS_SUCCESS,
                            res.data
                        )
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

function updateSparePart(data) {
    return (dispatch) => {
        dispatch(request(SparePartsTypes.UPDATESPAREPART_REQUEST));

        sparePartsService
            .updateSparePart(data)
            .then((res) => {
                if (res.data.status) {
                    dispatch(
                        callback(SparePartsTypes.GETSPAREPARTS_SUCCESS, {
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

function assignSparePartStockToMachine(data) {
    return (dispatch) => {
        dispatch(request(SparePartsTypes.UPDATESPAREPART_REQUEST));

        sparePartsService
            .assignSparePartStockToMachine(data)
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
                        callback(SparePartsTypes.GETSPAREPARTS_SUCCESS, {
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

function assignSparePartToMachine(data) {
    return (dispatch) => {
        dispatch(request(SparePartsTypes.ASSIGNSPAREPARTTOMACHINE_REQUEST));

        sparePartsService
            .assignSparePartToMachine(data)
            .then((res) => {
                if (res.data.status) {
                    dispatch(
                        callback(SparePartsTypes.GETSPAREPARTS_SUCCESS, {
                            sparePart: res.data.sparePart,
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

// function deleteMachine(_id) {
//     return (dispatch) => {
//         dispatch(request(SparePartsTypes.DELETEMACHINE_REQUEST));
//         sparePartsService
//             .deleteMachine(_id)
//             .then((response) => {
//                 if (response.data.status) {
//                     dispatch(
//                         callback(SparePartsTypes.GETMACHINES_SUCCESS, {
//                             delete: true,
//                             _id,
//                             status: response.data.status,
//                             message: response.data.message,
//                         })
//                     );
//                     dispatch(
//                         alertActions.showAlert({
//                             type: "success",
//                             message: response.data.message,
//                         })
//                     );
//                 } else {
//                     dispatch(
//                         alertActions.showAlert({
//                             type: "failure",
//                             message: response.data.message,
//                         })
//                     );
//                 }
//             })
//             .catch((err) => {
//                 if (err.response) {
//                     dispatch(
//                         alertActions.showAlert({
//                             type: "failure",
//                             message: err.response.data.message,
//                         })
//                     );
//                 } else {
//                     dispatch(
//                         alertActions.showAlert({
//                             type: "failure",
//                             message:
//                                 "Ha ocurrido un error, por favor intentalo nuevamente.",
//                         })
//                     );
//                 }
//             });
//     };
// }
