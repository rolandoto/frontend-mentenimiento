import React from "react";
import { useDispatch } from "react-redux";
import { maintenanceActions } from "../../../../@actions";
import { Input, Button, Text } from "../../../atoms";

export const AddMaintenanceType = ({ edit }) => {
    const dispatch = useDispatch();
    const eHandleSubmit = (e) => {
        e.preventDefault();
        const maintenanceType = {
            name: e.target.maintenanceTypeName.value,
        };

        if (!edit) {
            dispatch(maintenanceActions.createMaitenanceType(maintenanceType));
        } else {
            maintenanceType.maintenanceTypeID = e.target.maitenanceTypeID.value;
            dispatch(maintenanceActions.updateMaitenanceTypes(maintenanceType));
        }
    };

    return (
        <form
            method="POST"
            className="p20"
            onSubmit={eHandleSubmit}
            encType="multipar/form-data"
        >
            <Text
                type="h2"
                text={
                    edit
                        ? "Editar tipo de mantenimiento"
                        : "Agregar tipo de mantenimiento"
                }
                size={20}
                weight={500}
                color="#83889c"
            />
            <div className="separator_top"></div>

            {edit && (
                <Input
                    identifier="maitenanceTypeID"
                    type="hidden"
                    placeholder="ID del tipo de mantenimeinto"
                    min={5}
                    max={50}
                    height={50}
                    defaultValue={edit._id}
                    animated
                />
            )}

            <Input
                identifier="maintenanceTypeName"
                type="text"
                placeholder="Nombre del mantenimiento"
                min={5}
                max={50}
                height={50}
                defaultValue={edit ? edit.name : ""}
                animated
            />

            <Button
                text={edit ? "Editar" : "Agregar"}
                variant="secondary btn-big"
            />
        </form>
    );
};
