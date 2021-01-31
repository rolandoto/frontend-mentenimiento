import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { machineActions } from "../../../../@actions";
import {
    Input,
    Button,
    UploadImage,
    Text,
    Select,
    Option,
} from "../../../atoms";

export const AddMachineComponent = ({ edit }) => {
    const dispatch = useDispatch();
    const environmnets = useSelector((state) => state.EnvironmentsAllReducer);

    const eHandleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        if (e.target.machinePhoto.files.length > 0) {
            if (!edit) {
                dispatch(machineActions.createMachine(data));
            } else {
                dispatch(machineActions.updateMachine(data));
                e.target.machinePhoto.value = "";
            }
        } else {
            if (!edit) {
                dispatch(machineActions.createMachine(data));
            } else {
                const machine = {
                    machineID: e.target.machineID.value,
                    environmentID: e.target.environmentID.value,
                    machineCode: e.target.machineCode.value,
                    name: e.target.name.value,
                    totalHoursToMaintenance:
                        e.target.totalHoursToMaintenance.value,
                };

                if (!edit) {
                    machine.totalHoursRegisted =
                        e.target.totalHoursRegisted.value;
                }

                dispatch(machineActions.updateMachine(machine));
            }
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
                text={edit ? "Editar maquina" : "Agregar maquina"}
                size={20}
                weight={500}
                color="#83889c"
            />
            <div className="separator_top"></div>

            <div className="rows mb_20">
                <div className="col4 absolute_center">
                    <UploadImage
                        identifier="machinePhoto"
                        defaultPhoto={
                            edit
                                ? edit.machinePhoto
                                    ? process.env.REACT_APP_API +
                                      edit.machinePhoto.folder +
                                      edit.machinePhoto.filename
                                    : ""
                                : ""
                        }
                    />
                </div>
                <div className="col8">
                    {edit && (
                        <Input
                            identifier="machineID"
                            type="hidden"
                            placeholder="ID de la maquina"
                            min={5}
                            max={50}
                            height={50}
                            defaultValue={edit._id}
                            animated
                        />
                    )}

                    <Select
                        identifier="environmentID"
                        placeholder="Código del ambiente"
                        heigth={50}
                        defaultSelected={edit ? edit.environmentID : ""}
                    >
                        {environmnets.status &&
                            environmnets.environments.map((environment) => (
                                <Option
                                    key={environment._id}
                                    value={environment._id}
                                    text={environment.environmentCode}
                                />
                            ))}
                    </Select>

                    <div className="rows">
                        <div className="col6">
                            <Input
                                identifier="machineCode"
                                type="text"
                                placeholder="Código maquina"
                                min={5}
                                max={50}
                                height={50}
                                defaultValue={edit ? edit.machineCode : ""}
                                animated
                            />
                        </div>
                        <div className="col6">
                            <Input
                                identifier="name"
                                type="text"
                                placeholder="Nombre de la maquina"
                                min={5}
                                max={50}
                                height={50}
                                defaultValue={edit ? edit.name : ""}
                                animated
                            />
                        </div>
                    </div>
                    <div className="rows">
                        <div className="col6">
                            <Input
                                identifier="totalHoursToMaintenance"
                                type="number"
                                placeholder="Horas para el mantenimiento"
                                max={999}
                                height={50}
                                defaultValue={
                                    edit ? edit.totalHoursToMaintenance : ""
                                }
                                animated
                            />
                        </div>
                        <div className="col6">
                            {!edit && (
                                <Input
                                    identifier="totalHoursRegisted"
                                    type="number"
                                    placeholder="Horas de uso (Opcional)"
                                    max={200}
                                    height={50}
                                    defaultValue={
                                        edit ? edit.totalHoursRegisted : ""
                                    }
                                    animated
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Button
                text={edit ? "Editar" : "Agregar"}
                variant="secondary btn-big"
            />
        </form>
    );
};
