import React from "react";
import { Container } from "../../../layouts";
import { AddEnvironmentComponent } from "../../organisms/Modals";
import { environmentActions, alertActions } from "../../../@actions";
import { List } from "../";
import { useDispatch } from "react-redux";

export const EnvironmentList = ({ environments = [] }) => {
    const dispatch = useDispatch();

    const listHeader = ["Código del ambiente", "Nombre", ""];
    const keys = ["environmentCode", "name"];

    const onDeleteHandle = (data) => {
        const confirm = window.confirm("Estas seguro de eliminar el ambiente?");
        if (confirm) {
            if (data._id) {
                dispatch(environmentActions.deleteEnvironment(data._id));
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
                items={environments}
                EditComponent={AddEnvironmentComponent}
                keys={keys}
                onDelete={onDeleteHandle}
            />
        </Container>
    );
};
