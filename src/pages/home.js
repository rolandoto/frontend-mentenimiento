import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    environmentActions,
    machineActions,
    maintenanceActions,
    sparePartsActions,
} from "../@actions";
import { HomeTemplate } from "../components";

export const Home = (_) => {
    const dispatch = useDispatch();
    const sparePartsReducer = useSelector(
        (state) => state.SparePartsAllReducer
    );
    const machinesReducer = useSelector((state) => state.MachineAllReducer);
    const environmentsReducer = useSelector(
        (state) => state.EnvironmentsAllReducer
    );
    const maintenancesReducer = useSelector(
        (state) => state.MaitenancesAllReducer
    );

    useEffect(
        (_) => {
            if (!sparePartsReducer.status) {
                dispatch(sparePartsActions.getSpareParts());
            }
        },
        [dispatch, sparePartsReducer.status]
    );

    useEffect(
        (_) => {
            if (!machinesReducer.status) {
                dispatch(machineActions.getMachines());
            }
        },
        [dispatch, machinesReducer.status]
    );

    useEffect(
        (_) => {
            if (!maintenancesReducer.status) {
                dispatch(maintenanceActions.getMaitenances());
            }
        },
        [dispatch, maintenancesReducer.status]
    );

    useEffect(
        (_) => {
            if (!environmentsReducer.status) {
                dispatch(environmentActions.getEnvironments());
            }
        },
        [dispatch, environmentsReducer.status]
    );

    return (
        <HomeTemplate
            machines={
                machinesReducer.status ? machinesReducer.machines.length : 0
            }
            spareParts={
                sparePartsReducer.status
                    ? sparePartsReducer.spareParts.length
                    : 0
            }
            environments={
                environmentsReducer.status
                    ? environmentsReducer.environments.length
                    : 0
            }
            maintenances={
                maintenancesReducer.status
                    ? maintenancesReducer.maintenances.length
                    : 0
            }
        />
    );
};
