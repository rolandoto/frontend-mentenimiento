import React from "react";
import { Container } from "../../../layouts";
import { List } from "../";

export const EnvironmentList = ({ environments = [] }) => {
    const listHeader = ["Código del ambiente", "Nombre", ""];

    return (
        <Container>
            <List header={listHeader} items={environments} />
        </Container>
    );
};
