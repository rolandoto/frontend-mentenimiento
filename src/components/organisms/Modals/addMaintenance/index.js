import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { maintenanceActions } from "../../../../@actions";
import { Input, Button, Text, Select, Option } from "../../../atoms";

export const AddMaintenance = ({ edit }) => {
    const maintenanceTypes = useSelector(
        (state) => state.MaitenanceTypesReducer
    );
    const machinesReducer = useSelector((state) => state.MachineAllReducer);
    const dispatch = useDispatch();

    const eHandleSubmit = (e) => {
        e.preventDefault();
        const maintenance = {
            maintenanceType: e.target.maintenanceType.value,
            machine: e.target.machine.value,
        };

        dispatch(maintenanceActions.createMaitenance(maintenance));
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

            <Select
                identifier="maintenanceType"
                placeholder="Tipo de mantenimiento"
                heigth={50}
                defaultSelected={edit ? edit.environmentID : ""}
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

            <Select
                identifier="machine"
                placeholder="Seleccionar maquina"
                heigth={50}
                defaultSelected={edit ? edit.environmentID : ""}
            >
                {machinesReducer.status &&
                    machinesReducer.machines.map((type) => (
                        <Option
                            key={type._id}
                            value={type._id}
                            text={type.name}
                        />
                    ))}
            </Select>

            <Button
                text={edit ? "Editar" : "Agregar"}
                variant="secondary btn-big"
            />
        </form>
    );
};
