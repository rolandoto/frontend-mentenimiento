import React from "react";
import { Container } from "../../../layouts";
import { AddSparePartComponent } from "../../organisms/Modals";
import { modalActions } from "../../../@actions";
import { List } from "../";
import { PdfGenerator } from "../../../helpers";

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
        dispatch(
            modalActions.showModalDetail(
                "AddSparePartToMachine",
                item,
                "modal_size_small"
            )
        );
    };

    const exportSpareParts = (_) => {
        const headers = [
            "Código del repuesto",
            "Nombre",
            "Precio",
            "Stock",
            "Fecha de creación",
        ];
        const keyItems = [
            "sparePartCode",
            "name",
            "price",
            "stock",
            "create_at",
        ];
        PdfGenerator(
            headers,
            keyItems,
            spareParts,
            "Listado de repuestos"
        );
    };

    return (
        <Container>
            <List
                header={listHeader}
                items={spareParts}
                EditComponent={AddSparePartComponent}
                keys={keys}
                assignSparePart={assignSparePart}
                pdf={[
                    {
                        title: "Exportar respuestos",
                        action: exportSpareParts,
                    },
                ]}
            />
        </Container>
    );
};
