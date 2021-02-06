import { ModalTypes } from "../../@types";

export const ModalReducer = (state = {}, action) => {
    switch (action.type) {
        case ModalTypes.SHOW_MODAL:
            return {
                show: true,
                component: action.component,
                item: action.item,
            };
        case ModalTypes.HIDE_MODAL:
            return {};
        default:
            return state;
    }
};

export const ModalDetailReducer = (state = {}, action) => {
    switch (action.type) {
        case ModalTypes.SHOW_MODAL_DETAIL:
            return {
                show: true,
                item: action.item,
                component: action.component,
            };
        case ModalTypes.HIDE_MODAL_DETAIL:
            return {};
        default:
            return state;
    }
};
