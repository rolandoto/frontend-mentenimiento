import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../@actions";
import { Close } from "@material-ui/icons";
import * as ModalComponentSelector from "../components/organisms/Modals";

export const ModalDetails = (_) => {
    const modal = useSelector((state) => state.ModalDetailReducer);
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();

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
        dispatch(modalActions.closeModalDetail());
    };

    if (showModal && modal.show) {
        const Component = ModalComponentSelector[modal.component];

        if (Component) {
            return (
                <div className="modal_shadow">
                    <div
                        className={
                            modal.size
                                ? "modal_details " + modal.size
                                : "modal_details modal_size_big"
                        }
                    >
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
