import React from "react";
import { Container } from "../../../layouts";
import { AddSparePartComponent } from "../../organisms/Modals";
import { modalActions } from "../../../@actions";
import { List } from "../";
import { useDispatch } from "react-redux";

export const SparePartList = ({ spareParts = [] }) => {
    const dispatch = useDispatch();

    const listHeader = ["Código de la pieza de repuesto", "Nombre", ""];
    const keys = ["sparePartCode", "name"];

    // const onDeleteHandle = (data) => {
    //     const confirm = window.confirm("Estas seguro de eliminar la maquina?");
    //     if (confirm) {
    //         if (data._id) {
    //             // dispatch(machineActions.deleteMachine(data._id));
    //         } else {
    //             dispatch(
    //                 alertActions.showAlert({
    //                     type: "failure",
    //                     message: "Ha ocurrido un error, intentalo nuevamente.",
    //                 })
    //             );
    //         }
    //     }
    // };

    const assignSparePart = (item) => {
        dispatch(modalActions.showModal("AddSparePartToMachine", item));
    };

    return (
        <Container>
            <List
                header={listHeader}
                items={spareParts}
                EditComponent={AddSparePartComponent}
                keys={keys}
                assignSparePart={assignSparePart}
            />
        </Container>
    );
};
