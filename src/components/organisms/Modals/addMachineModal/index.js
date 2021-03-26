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
    const machineTypeReducer = useSelector((state) => state.MachineTypesReducer);

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
                    machineType: e.target.machineType.value,
                    environmentID: e.target.environmentID.value,
                    machineCode: e.target.machineCode.value,
                    name: e.target.name.value,
                    model: e.target.model.value,
                    adquisiton_year: e.target.adquisiton_year.value,
                    voltage: e.target.voltage.value,
                    brand: e.target.brand.value,
                    stream: e.target.stream.value,
                    watts: e.target.watts.value,
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

                    <Select
                        identifier="machineType"
                        placeholder="Tipo de maquina"
                        heigth={50}
                        defaultSelected={edit ? edit.machineType : ""}
                    >
                        {machineTypeReducer.status &&
                            machineTypeReducer.machineTypes.map((machineType) => (
                                <Option
                                    key={machineType._id}
                                    value={machineType._id}
                                    text={machineType.machine_type_name}
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
                                identifier="model"
                                type="text"
                                placeholder="Modelo"
                                min={3}
                                max={100}
                                height={50}
                                defaultValue={edit ? edit.model : ""}
                                animated
                            />
                        </div>
                        <div className="col6">
                            <Input
                                identifier="adquisiton_year"
                                type="text"
                                placeholder="Año de adquisición"
                                min={3}
                                max={20}
                                height={50}
                                defaultValue={edit ? edit.adquisiton_year : ""}
                                animated
                            />
                        </div>
                    </div>
                    <div className="rows">
                        <div className="col6">
                            <Input
                                identifier="voltage"
                                type="text"
                                placeholder="Voltaje"
                                min={2}
                                max={100}
                                height={50}
                                defaultValue={edit ? edit.voltage : ""}
                                animated
                            />
                        </div>
                        <div className="col6">
                            <Input
                                identifier="watts"
                                type="text"
                                placeholder="Watts"
                                min={1}
                                max={100}
                                height={50}
                                defaultValue={edit ? edit.watts : ""}
                                animated
                            />
                        </div>
                    </div>
                    <div className="rows">
                        <div className="col6">
                            <Input
                                identifier="stream"
                                type="text"
                                placeholder="Corriente"
                                min={2}
                                max={100}
                                height={50}
                                defaultValue={edit ? edit.stream : ""}
                                animated
                            />
                        </div>
                        <div className="col6">
                            <Input
                                identifier="brand"
                                type="text"
                                placeholder="Marca"
                                min={3}
                                max={50}
                                height={50}
                                defaultValue={edit ? edit.brand : ""}
                                animated
                            />
                        </div>
                    </div>
                    {!edit && (
                        <Input
                            identifier="totalHoursRegisted"
                            type="number"
                            placeholder="Horas de uso (Opcional)"
                            max={200}
                            height={50}
                            defaultValue={edit ? edit.totalHoursRegisted : ""}
                            animated
                        />
                    )}
                </div>
            </div>
            <Button
                text={edit ? "Editar" : "Agregar"}
                variant="secondary btn-big"
            />
        </form>
    );
};
