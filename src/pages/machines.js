import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { machineActions, environmentActions , machineTypeActions } from "../@actions";
import { MachinesTemplate } from "../components";

export const Machines = (_) => {
    const dispatch = useDispatch();
    const environments = useSelector((state) => state.EnvironmentsAllReducer);
    const machines = useSelector((state) => state.MachineAllReducer);
    const machineTypes = useSelector((state) => state.MachineTypesReducer);

    useEffect(
        (_) => {
            if (!environments.status) {
                dispatch(environmentActions.getEnvironments());
            }
        },
        [dispatch, environments.status]
    );

    useEffect(
        (_) => {
            dispatch(machineActions.getMachines());
        },
        [dispatch]
    );

    useEffect(
        (_) => {
            if (!machineTypes.status) {
                dispatch(machineTypeActions.getMachineTypes());
            }
        },
        [dispatch, machineTypes.status]
    );

    return (
        <MachinesTemplate
            machines={machines.status ? machines.machines : []}
            machineTypes={machineTypes.status ? machineTypes.machineTypes : []}
            environmnets={environments.status ? environments.environments : []}
        />
    );
};
