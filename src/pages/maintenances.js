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

    useEffect(
        (_) => {
            dispatch(maintenanceActions.getMaitenanceTypes());
            dispatch(maintenanceActions.getMaitenances());
            dispatch(machineActions.getMachines());
        },
        [dispatch]
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
