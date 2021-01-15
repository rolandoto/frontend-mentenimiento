import React from "react";
import { Button } from "../../atoms";
import { EnvironmentList } from "../../organisms";
import { Add } from '@material-ui/icons'

export const EnvironmentTemplate = (_) => {

    const addEnvironment = _ => {
        console.log("HH")
    }

    return (
        <>
            <Button text="Agregar" variant="secondary" Icon={Add} onClick={addEnvironment}  />
            <EnvironmentList />
        </>
    );
};
