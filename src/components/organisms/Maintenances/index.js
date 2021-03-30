import React from "react";
import { Container } from "../../../layouts";
import { AddMaintenanceType, AddMaintenance } from "../../organisms/Modals";
import { alertActions, maintenanceActions } from "../../../@actions";
import { List } from "../";
import { useDispatch } from "react-redux";

export const MaintenancesList = ({ items = [], tab }) => {
    const dispatch = useDispatch();
    const listHeader =
        tab === "maintenances"
            ? ["Tipo de mantenimiento", "Nombre del mantenimiento", ""]
            : ["Identificador", "Nombre", ""];
    const keys =
        tab === "maintenances"
            ? ["maintenanceTypeName", "name"]
            : ["_id", "name"];

    const onDeleteMaitenance = (data) => {
        const confirm = window.confirm(
            "Estas seguro de eliminar el mantenimiento?"
        );
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
                    tab === "maintenances" ? AddMaintenance : AddMaintenanceType
                }
                keys={keys}
                onDelete={
                    tab === "maintenances"
                        ? onDeleteMaitenance
                        : onDeleteMaitenanceType
                }
                totalRows={tab === "maintenances" ? 3 : 3}
            />
        </Container>
    );
};
