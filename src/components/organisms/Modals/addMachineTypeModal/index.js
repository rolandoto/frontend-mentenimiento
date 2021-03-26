import React from "react";
import { useDispatch } from "react-redux";
import { machineTypeActions } from "../../../../@actions";
import { Input, Button, Text } from "../../../atoms";

export const AddMachineTypeComponent = ({ edit }) => {
    const dispatch = useDispatch();

    const eHandleSubmit = (e) => {
        e.preventDefault();

        const machineType = {
            machine_type_name: e.target.machine_type_name.value,
        };

        if (edit) {
            machineType.machineTypeID = e.target.machineTypeID.value;
        }

        if (!edit) {
            dispatch(machineTypeActions.createMachineType(machineType));
        } else {
            dispatch(machineTypeActions.updateMachineType(machineType));
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
                    edit ? "Editar tipo de maquina" : "Agregar tipo de maquina"
                }
                size={20}
                weight={500}
                color="#83889c"
            />
            <div className="separator_top"></div>

            <div className="rows mb_20">
                <div className="col12">
                    {edit && (
                        <Input
                            identifier="machineTypeID"
                            type="hidden"
                            placeholder="ID del tipo maquina"
                            min={5}
                            max={50}
                            height={50}
                            defaultValue={edit._id}
                            animated
                        />
                    )}
                    <Input
                        identifier="machine_type_name"
                        type="text"
                        placeholder="Nombre del tipo de maquina"
                        min={5}
                        max={50}
                        height={50}
                        defaultValue={edit ? edit.machine_type_name : ""}
                        animated
                    />
                </div>
            </div>
            <Button
                text={edit ? "Editar" : "Agregar"}
                variant="secondary btn-big"
            />
        </form>
    );
};
