import React, { useEffect, useState } from "react";
import { modalActions } from "../@actions";
import { useDispatch, useSelector } from "react-redux";
import { Close } from "@material-ui/icons";
import * as ModalComponentSelector from "../components/organisms/Modals";

export const Modal = ({ children, component }) => {
    const modal = useSelector((state) => state.ModalReducer);
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);

    useEffect(
        (_) => {
            if (modal.show) {
                setShowModal(modal.show);
            } else {
                setShowModal(false);
            }
        },
        [modal]
    );

    const closeModal = (_) => {
        dispatch(modalActions.closeModal());
    };

    if (showModal && modal.show) {
        const Component = ModalComponentSelector[modal.component];
        if (Component) {
            return (
                <div className="modal_container">
                    <div className="modal_content modal_big">
                        <Close
                            onClick={() => closeModal()}
                            className="icon_close_modal"
                        />
                        <Component />
                    </div>
                </div>
            );
        } else {
            return <></>;
        }
    } else {
        return <></>;
    }
};
