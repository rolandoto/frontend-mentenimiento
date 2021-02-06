import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { machineActions, sparePartsActions } from "../@actions";
import { SparePartsTemplate } from "../components";

export const SpareParts = (_) => {
    const dispatch = useDispatch();
    const sparePartsReducer = useSelector(
        (state) => state.SparePartsAllReducer
    );
    const machines = useSelector((state) => state.MachineAllReducer);

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
            if (!machines.status) {
                dispatch(machineActions.getMachines());
            }
        },
        [dispatch, machines.status]
    );

    return (
        <SparePartsTemplate
            spareParts={
                sparePartsReducer.status ? sparePartsReducer.spareParts : []
            }
        />
    );
};
