import React from "react";
import { Container } from "../../../layouts";
import { AddMaintenanceType } from "../../organisms/Modals";
import { alertActions, maintenanceActions } from "../../../@actions";
import { List } from "../";
import { useDispatch } from "react-redux";

export const MaintenancesList = ({ items = [], tab }) => {
    const dispatch = useDispatch();
    const listHeader =
        tab === "maintenances"
            ? ["Nombre del mantenimiento", "Código de la maquina", "Estado", ""]
            : ["Identificador", "Nombre", ""];
    const keys =
        tab === "maintenances"
            ? ["maintenanceTypeName", "machineCode", "complete"]
            : ["_id", "name"];

    const onDeleteMaitenance = (data) => {
        const confirm = window.confirm("Estas seguro de eliminar la maquina?");
        if (confirm) {
            if (data._id) {
                dispatch(maintenanceActions.deleteMaintenance(data._id));
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

    const onDeleteMaitenanceType = (data) => {
        const confirm = window.confirm(
            "Estas seguro de eliminar el tipo de mantenimiento?"
        );
        if (confirm) {
            if (data._id) {
                dispatch(maintenanceActions.deleteMaintenanceType(data._id));
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
                items={items}
                EditComponent={
                    tab === "maintenances" ? false : AddMaintenanceType
                }
                keys={keys}
                onDelete={
                    tab === "maintenances"
                        ? onDeleteMaitenance
                        : onDeleteMaitenanceType
                }
                totalRows={tab === "maintenances" ? 4 : 3}
            />
        </Container>
    );
};
