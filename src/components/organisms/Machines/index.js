import React from "react";
import { Container } from "../../../layouts";
import { AddMachineComponent } from "../../organisms/Modals";
import { alertActions, machineActions } from "../../../@actions";
import { List } from "../";
import { useDispatch } from "react-redux";

export const MachinesList = ({ machines = [] }) => {
    const dispatch = useDispatch();

    const listHeader = ["Código de la maquina", "Nombre", ""];
    const keys = ["machineCode", "name"];

    const onDeleteHandle = (data) => {
        const confirm = window.confirm("Estas seguro de eliminar la maquina?");
        if (confirm) {
            if (data._id) {
                dispatch(machineActions.deleteMachine(data._id));
            } else {
                dispatch(
                    alertActions.showAlert({
                        type: "failure",
                        message: "Ha ocurrido un error, intentalo nuevamente.",
                    })
                );
            }
        }
    };

    return (
        <Container>
            <List
                header={listHeader}
                items={machines}
                EditComponent={AddMachineComponent}
                keys={keys}
                onDelete={onDeleteHandle}
            />
        </Container>
    );
};
