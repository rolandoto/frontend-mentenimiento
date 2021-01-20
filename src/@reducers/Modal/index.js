import { ModalTypes } from "../../@types";

export const ModalReducer = (state = {}, action) => {
    switch (action.type) {
        case ModalTypes.SHOW_MODAL:
            return {
                show: true,
                component: action.component,
            };
        case ModalTypes.HIDE_MODAL:
            return {};
        default:
            return state;
    }
};
