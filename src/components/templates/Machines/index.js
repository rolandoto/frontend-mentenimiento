import React, { useState } from "react";
import { Button } from "../../atoms";
import { MachinesList , MachineTypeList} from "../../organisms";
import { AddCircle } from "@material-ui/icons";
import { modalActions } from "../../../@actions";
import { useDispatch } from "react-redux";

export const MachinesTemplate = ({ machines = [], machineTypes = [], environmnets = [] }) => {
    const dispatch = useDispatch();

    const [type, setType] = useState("machines");

    const addMachine = (_) => {
        dispatch(modalActions.showModal("AddMachineComponent"));
    };

    const addMachineType = (_) => {
        dispatch(modalActions.showModal("AddMachineTypeComponent"));
    };

    return (
        <>
            <div className="center_between mb_20">
                <div></div>
                <div className="rows">
                    {type === "machines" && (
                        <Button
                            text="Agregar Maquina"
                            variant="secondary"
                            Icon={AddCircle}
                            onClick={addMachine}
                            style={{ marginRight: 10 }}
                        />
                    )}
                    {type === "machineTypes" && (
                        <Button
                            text="Agregar tipo de maquina"
                            variant="secondary"
                            Icon={AddCircle}
                            onClick={addMachineType}
                            style={{ marginRight: 10 }}
                        />
                    )}
                    {type === "machineTypes" && (
                        <Button
                            text="Maquinas"
                            variant="secondary"
                            Icon={AddCircle}
                            onClick={() => setType("machines")}
                        />
                    )}
                    {type === "machines" && (
                        <Button
                            text="Tipos de maquinas"
                            variant="secondary"
                            Icon={AddCircle}
                            onClick={() => setType("machineTypes")}
                        />
                    )}
                </div>
            </div>

            {type === "machines" && <MachinesList machines={machines} />}
            {type === "machineTypes" && <MachineTypeList machineTypes={machineTypes} />}
        </>
    );
};
