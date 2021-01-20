import React from "react";
import { Button } from "../../atoms";
import { EnvironmentList } from "../../organisms";
import { modalActions } from "../../../@actions";
import { AddCircle } from "@material-ui/icons";
import { useDispatch } from "react-redux";

export const EnvironmentTemplate = ({ environments = [] }) => {
    const dispatch = useDispatch();

    const addEnvironment = (_) => {
        dispatch(modalActions.showModal("AddEnvironmentComponent"));
    };

    return (
        <>
            <div className="center_between mb_20">
                <div></div>
                <Button
                    text="Agregar"
                    variant="secondary"
                    Icon={AddCircle}
                    onClick={addEnvironment}
                />
            </div>
            <EnvironmentList environments={environments} />
        </>
    );
};
