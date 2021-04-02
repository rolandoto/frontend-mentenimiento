import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sparePartsActions } from "../../../../@actions";
import { Text, Avatar, Button, Input } from "../../../atoms";
import "./addSparePartToMachine.scss";

export const AddSparePartToMachine = (_) => {
    const machinesReducer = useSelector((state) => state.MachineAllReducer);
    const modal = useSelector((state) => state.ModalDetailReducer);
    const dipatch = useDispatch();
    const [machines, setMachines] = useState([]);
    const [machinesFiltered, setMachinesFiltered] = useState(false);
    const [machinesSelected, setMachinesSelected] = useState(
        modal.item.machines
    );

    useEffect(
        (_) => {
            const selectedMachines = [...machinesSelected];
            const machinesAssigned = machinesReducer.machines.map((machine) => {
                const isAssigned = selectedMachines.some((id) => {
                    return machine._id === id;
                });

                machine.isAssigned = isAssigned ? true : false;

                return machine;
            });

            setMachines(machinesAssigned);
        },
        [machinesReducer.machines, machinesSelected]
    );

    const eHandlePressKey = (e) => {
        const filter = e.target.value;
        if (filter.length > 0) {
            const machinesToFilter = [...machines];
            const resultFilter = machinesToFilter.filter((machine) => {
                return machine.name.includes(filter);
            });
            setMachinesFiltered(resultFilter);
        } else {
            setMachinesFiltered(false);
        }
    };

    const evalueSelectedMachine = (id) => {
        const selectedMachines = [...machinesSelected];
        if (selectedMachines.some((machine) => machine === id)) {
            setMachinesSelected(
                selectedMachines.filter((machine) => {
                    return machine !== id;
                })
            );
        } else {
            setMachinesSelected([...selectedMachines, id]);
        }

        dipatch(
            sparePartsActions.assignSparePartToMachine({
                sparePartID: modal.item._id,
                machineID: id,
            })
        );
    };

    const printMachines = (machines) => {
        return machines.map((machine) => (
            <div key={machine._id} className="item_machine_assing">
                <input
                    type="checkbox"
                    onChange={() => evalueSelectedMachine(machine._id)}
                    checked={machine.isAssigned}
                    className="mr_10"
                />
                <Avatar
                    image={
                        process.env.REACT_APP_API +
                        machine.machinePhoto.folder +
                        machine.machinePhoto.filename
                    }
                    className="machine_photo"
                    size={40}
                />
                <p className="ml_10">{machine.name}</p>
            </div>
        ));
    };

    return (
        <div className="p20 h100">
            <Text
                type="h2"
                text="Asignar repuesto"
                size={20}
                weight={500}
                color="#83889c"
            />
            <div className="separator_top"></div>
            <input
                type="hidden"
                value={JSON.stringify(machinesSelected)}
                readOnly
            />

            <Input
                type="text"
                placeholder="Buscar maquina"
                animated
                min={0}
                max={100}
                onKeyUp={(e) => eHandlePressKey(e)}
            />

            <div className="machine_detailed_list">
                {printMachines(machinesFiltered ? machinesFiltered : machines)}
            </div>

            <Button text="Guardar" variant="secondary btn-big" />
        </div>
    );
};
