import React from "react";
import { Container } from "../../../layouts";
import { AddMachineComponent } from "../../organisms/Modals";
import { alertActions, machineActions, modalActions } from "../../../@actions";
import { List } from "../";
import { useDispatch } from "react-redux";
import { PdfGenerator } from "../../../helpers";

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

    const onDetailPressed = (item) => {
        dispatch(modalActions.showModalDetail("MachineDetails", item));
    };

    const exportMachines = (_) => {
        const headers = [
            "Nombre",
            "Estado",
            "Horas totales trabajadas",
            "Modelo",
            "Marca",
            "Año de adquisición",
            "Corriente",
            "Voltaje",
            "Watts",
            "Fecha de creación",
        ];
        const keyItems = [
            "name",
            "status",
            "totalHoursRegisted",
            "model",
            "brand",
            "adquisiton_year",
            "stream",
            "voltage",
            "watts",
            "create_at",
        ];
        const machinesToEvalue = [...machines];
        const setStatusName = machinesToEvalue.map((machine) => {
            machine.status =
                machine.status === "active" ? "Activa" : "En mantenimiento";
            return machine;
        });
        PdfGenerator(
            headers,
            keyItems,
            setStatusName,
            "Listado de maquinas",
            "l"
        );
    };

    const exportMaintenances = (machine) => {
        const headers = [
            "Tipo de mantenimiento",
            "Nombre",
            "Estado",
            "Fecha de creación",
        ];
        const keyItems = ["maintenanceType", "name", "complete", "create_at"];

        const setMaintenanceTypeName = machine.maintenances.map(
            (machineItem) => {
                machineItem.maintenanceType =
                    typeof machineItem.maintenanceType === "object"
                        ? machineItem.maintenanceType.name
                        : machineItem.maintenanceType;
                machineItem.complete = machineItem.complete
                    ? "Completado"
                    : "En curso";

                return machineItem;
            }
        );

        PdfGenerator(
            headers,
            keyItems,
            setMaintenanceTypeName.reverse(),
            "Listado de mantenimientos de la maquina: " + machine.name,
            "l"
        );
    };

    const exportUsedSpareParts = (machine) => {
        const headers = [
            "Código del repuesto",
            "Nombre",
            "Precio",
            "Stock usado",
            "Fecha usado",
        ];
        const keyItems = [
            "sparePartCode",
            "name",
            "price",
            "stockUsed",
            "create_at",
        ];

        PdfGenerator(
            headers,
            keyItems,
            machine.usedSpareParts.reverse(),
            "Listado de repuestos usados de la maquina: " + machine.name
        );
    };

    const exportIssues = (machine) => {
        const headers = ["Reportado por", "Reporte", "Fecha del reporte"];
        const keyItems = ["name", "note", "date"];

        PdfGenerator(
            headers,
            keyItems,
            machine.machineIssues.reverse(),
            "Listado de reportes de la maquina: " + machine.name
        );
    };

    const exportMachineUses = (machine) => {
        const headers = ["Usada por", "Horas usada", "Nota", "Fecha de uso"];
        const keyItems = ["user", "hours", "note", "create_at"];

        const setUserName = machine.machineUses.map((machineItem) => {
            machineItem.user =
                typeof machineItem.user === "object"
                    ? machineItem.user.name
                    : machineItem.user;

            return machineItem;
        });

        PdfGenerator(
            headers,
            keyItems,
            setUserName.reverse(),
            "Listado de usos de la maquina: " + machine.name,
        );
    };

    return (
        <Container>
            <List
                header={listHeader}
                items={machines}
                EditComponent={AddMachineComponent}
                keys={keys}
                onDelete={onDeleteHandle}
                details={onDetailPressed}
                visibility={"machineUse/"}
                pdfOnItem={[
                    {
                        title: "Exportar mantenimientos",
                        action: exportMaintenances,
                    },
                    {
                        title: "Exportar repuestos usados",
                        action: exportUsedSpareParts,
                    },
                    {
                        title: "Exportar reportes realizados",
                        action: exportIssues,
                    },
                    {
                        title: "Exportar usos realizados",
                        action: exportMachineUses,
                    },
                ]}
                pdf={[
                    {
                        title: "Exportar maquinas",
                        action: exportMachines,
                    },
                ]}
            />
        </Container>
    );
};
