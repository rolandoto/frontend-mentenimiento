import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EnvironmentTemplate } from "../components";
import { environmentActions } from "../@actions";

export const Environments = (_) => {
    const dispatch = useDispatch();
    const environments = useSelector((state) => state.EnvironmentsAllReducer);

    useEffect(
        (_) => {
            if (!environments.status) {
                dispatch(environmentActions.getEnvironments());
            }
        },
        [dispatch, environments.status]
    );

    return (
        <EnvironmentTemplate
            environments={environments.status ? environments.environments : []}
        />
    );
};
