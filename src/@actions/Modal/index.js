import { ModalTypes } from "../../@types";

export const modalActions = {
    showModal,
    closeModal,
};

function showModal(type) {
    return (dispatch) => {
        dispatch({
            type: ModalTypes.SHOW_MODAL,
            component: type,
        });
    };
}

function closeModal() {
    return (dispatch) => {
        dispatch({
            type: ModalTypes.HIDE_MODAL,
        });
    };
}
