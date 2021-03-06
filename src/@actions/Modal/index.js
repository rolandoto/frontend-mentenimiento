import { ModalTypes } from "../../@types";

export const modalActions = {
    showModal,
    closeModal,
    showModalDetail,
    closeModalDetail,
};

function showModal(type, item) {
    return (dispatch) => {
        dispatch({
            type: ModalTypes.SHOW_MODAL,
            component: type,
            item,
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

function showModalDetail(type, item, size) {
    return (dispatch) => {
        dispatch({
            type: ModalTypes.SHOW_MODAL_DETAIL,
            item,
            component: type,
            size: size ? size : false,
        });
    };
}

function closeModalDetail() {
    return (dispatch) => {
        dispatch({
            type: ModalTypes.HIDE_MODAL_DETAIL,
        });
    };
}
