import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { sparePartsActions } from "../../../../@actions";
import { Button, Text, Select, Option, Input } from "../../../atoms";

export const AddSparePartToMachine = (_) => {
    const machinesReducer = useSelector((state) => state.MachineAllReducer);
    const modal = useSelector((state) => state.ModalReducer);
    const dispatch = useDispatch();

    const eHandleSubmit = (e) => {
        e.preventDefault();
        const sparePart = {
            sparePartID: e.target.sparePartID.value,
            machineID: e.target.machineID.value,
            stock: e.target.stock.value,
        };
        dispatch(sparePartsActions.assignSparePartToMachine(sparePart));
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
                text="Asignar repuesto"
                size={20}
                weight={500}
                color="#83889c"
            />
            <div className="separator_top"></div>

            <Input
                type="hidden"
                animated
                identifier="sparePartID"
                placeholder="ID"
                min={1}
                max={100}
                defaultValue={modal.item._id}
                readonly
            />

            <Input
                type="text"
                animated
                identifier="sparePartName"
                placeholder="Repuesto"
                min={1}
                max={100}
                defaultValue={modal.item.name}
                readonly
            />

            <Select
                identifier="machineID"
                placeholder="Seleccionar maquina"
                heigth={50}
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

            <Input
                type="number"
                animated
                identifier="stock"
                placeholder="Cantidad de repuestos a usar"
                min={1}
                max={999}
                defaultValue={0}
            />

            <Button text="Asignar" variant="secondary btn-big" />
        </form>
    );
};
