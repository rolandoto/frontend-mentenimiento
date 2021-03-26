import React from "react";
import { Container } from "../../../layouts";
import { AddMachineTypeComponent } from "../../organisms/Modals";
import { alertActions, machineTypeActions } from "../../../@actions";
import { List } from "../";
import { useDispatch } from "react-redux";

export const MachineTypeList = ({ machineTypes = [] }) => {
    const dispatch = useDispatch();

    const listHeader = ["Nombre del tipo", ""];
    const keys = ["machine_type_name"];

    const onDeleteHandle = (data) => {
        const confirm = window.confirm("Estas seguro de eliminar el tipo maquina?");
        if (confirm) {
            if (data._id) {
                dispatch(machineTypeActions.deleteMachineType(data._id));
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
                items={machineTypes}
                EditComponent={AddMachineTypeComponent}
                keys={keys}
                onDelete={onDeleteHandle}
            />
        </Container>
    );
};
