import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EnvironmentTemplate } from "../components";
import { environmentActions } from "../@actions";

export const Environments = (_) => {
    const dispatch = useDispatch();
    const environments = useSelector((state) => state.EnvironmentsAllReducer);

    useEffect(
        (_) => {
            dispatch(environmentActions.getEnvironments());
        },
        [dispatch]
    );

    return (
        <EnvironmentTemplate
            environments={environments.status ? environments.environments : []}
        />
    );
};
