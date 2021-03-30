import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { alertActions, maintenanceActions } from "../../../../@actions";
import { Input, Button, Text, Select, Option, InputTask } from "../../../atoms";

export const AddMaintenance = ({ edit }) => {
    const maintenanceTypes = useSelector(
        (state) => state.MaitenanceTypesReducer
    );

    const dispatch = useDispatch();

    const eHandleSubmit = (e) => {
        e.preventDefault();
        const maintenance = {
            maintenanceType: e.target.maintenanceType.value,
            name: e.target.maintenanceName.value,
            check_list: JSON.parse(e.target.tasks.value),
        };

        if (
            maintenance.maintenanceType.length > 0 &&
            maintenance.name.length > 0 &&
            maintenance.check_list.length > 0
        ) {
            if (edit) {
                if (e.target.maitenanceID) {
                    maintenance.maintenanceID = e.target.maitenanceID.value;
                    
                    dispatch(maintenanceActions.updateMaitenance(maintenance));
                } else {
                    dispatch(
                        alertActions.showAlert({
                            type: "failure",
                            message:
                                "No se ha encontrado el ID del mantenimiento.",
                        })
                    );
                }
            } else {
                dispatch(maintenanceActions.createMaitenance(maintenance));
            }
        } else {
            dispatch(
                alertActions.showAlert({
                    type: "failure",
                    message: "Debes llenar todos los campos requeridos.",
                })
            );
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
                    identifier="maitenanceID"
                    type="hidden"
                    placeholder="ID del tipo de mantenimeinto"
                    min={5}
                    max={50}
                    height={50}
                    defaultValue={edit._id}
                    animated
                />
            )}

            <Select
                identifier="maintenanceType"
                placeholder="Tipo de mantenimiento"
                height={50}
                defaultSelected={edit ? edit.maintenanceType._id : ""}
            >
                {maintenanceTypes.status &&
                    maintenanceTypes.maintenanceTypes.map((type) => (
                        <Option
                            key={type._id}
                            value={type._id}
                            text={type.name}
                        />
                    ))}
            </Select>

            <Input
                identifier="maintenanceName"
                height={50}
                animated
                type="text"
                placeholder="Nombre del mantenimiento"
                defaultValue={edit ? edit.name : ""}
                min={5}
                max={150}
            />

            <InputTask tasks={edit ? edit.check_list : []} max={10} />

            <Button
                text={edit ? "Editar" : "Agregar"}
                variant="secondary btn-big"
            />
        </form>
    );
};
