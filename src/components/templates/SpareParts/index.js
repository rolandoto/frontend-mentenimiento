import React from "react";
import { Button } from "../../atoms";
import { SparePartList } from "../../organisms";
import { AddCircle } from "@material-ui/icons";
import { modalActions } from "../../../@actions";
import { useDispatch } from "react-redux";

export const SparePartsTemplate = ({ spareParts = [] }) => {
    const dispatch = useDispatch();

    const addMachine = (_) => {
        dispatch(modalActions.showModal("AddSparePartComponent"));
    };

    return (
        <>
            <div className="center_between mb_20">
                <div></div>
                <Button
                    text="Agregar"
                    variant="secondary"
                    Icon={AddCircle}
                    onClick={addMachine}
                />
            </div>
            <SparePartList spareParts={spareParts} />
        </>
    );
};
