import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { machineActions, environmentActions } from "../@actions";
import { MachinesTemplate } from "../components";

export const Machines = (_) => {
    const dispatch = useDispatch();
    const environments = useSelector((state) => state.EnvironmentsAllReducer);
    const machines = useSelector((state) => state.MachineAllReducer);

    useEffect(
        (_) => {
            dispatch(environmentActions.getEnvironments());
            dispatch(machineActions.getMachines());
        },
        [dispatch]
    );
    return (
        <MachinesTemplate
            machines={machines.status ? machines.machines : []}
            environmnets={environments.status ? environments.environments : []}
        />
    );
};
