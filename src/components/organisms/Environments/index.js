import React from "react";
import { Container } from "../../../layouts";
import { AddEnvironmentComponent } from "../../organisms/Modals";
import { environmentActions, alertActions } from "../../../@actions";
import { List } from "../";
import { useDispatch } from "react-redux";
import { PdfGenerator } from "../../../helpers";

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

    const exportEnvironments = (_) => {
        const headers = [
            "Nombre",
            "Código del ambiente",
            "Encargado",
            "Fecha de creación",
        ];
        const keyItems = ["name", "environmentCode", "in_charge", "create_at"];
        PdfGenerator(headers, keyItems, environments, "Listado de ambientes");
    };

    return (
        <Container>
            <List
                header={listHeader}
                items={environments}
                EditComponent={AddEnvironmentComponent}
                keys={keys}
                onDelete={onDeleteHandle}
                pdf={[
                    {
                        title: "Exportar ambientes",
                        action: exportEnvironments,
                    },
                ]}
            />
        </Container>
    );
};
