import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { machineActions, maintenanceActions } from "../@actions";
import { MaintenanceTemplate } from "../components";

export const Maintenances = (_) => {
    const dispatch = useDispatch();
    const maitenanceTypes = useSelector(
        (state) => state.MaitenanceTypesReducer
    );
    const maintenances = useSelector((state) => state.MaitenancesAllReducer);
    const machines = useSelector((state) => state.MachineAllReducer);

    useEffect(
        (_) => {
            if (!maitenanceTypes.status) {
                dispatch(maintenanceActions.getMaitenanceTypes());
            }
        },
        [dispatch, maitenanceTypes.status]
    );

    useEffect(
        (_) => {
            if (!maintenances.status) {
                dispatch(maintenanceActions.getMaitenances());
            }
        },
        [dispatch, maintenances.status]
    );

    useEffect(
        (_) => {
            if (!machines.status) {
                dispatch(machineActions.getMachines());
            }
        },
        [dispatch, machines.status]
    );

    return (
        <MaintenanceTemplate
            maintenances={maintenances.status ? maintenances.maintenances : []}
            maintenanceTypes={
                maitenanceTypes.status ? maitenanceTypes.maintenanceTypes : []
            }
        />
    );
};
