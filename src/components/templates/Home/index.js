import React from "react";
import { Container } from "../../../layouts";
import { InfoBox } from "../../atoms";
import { Build, Category, Memory, Eco } from "@material-ui/icons";

export const HomeTemplate = ({
    machines,
    environments,
    spareParts,
    maintenances,
}) => {
    return (
        <React.Fragment>
            <Container>
                <div className="rows" style={{ padding: "30px 15px" }}>
                    <div className="col3">
                        <InfoBox
                            Icon={Memory}
                            text="Maquinas"
                            conunter={machines}
                            color="#FAF4F4"
                            iconColor="#E1CBCB"
                        />
                    </div>
                    <div className="col3">
                        <InfoBox
                            Icon={Build}
                            text="Mantenimientos"
                            conunter={maintenances}
                            color="#FAF6F4"
                            iconColor="#DECFC9"
                        />
                    </div>
                    <div className="col3">
                        <InfoBox
                            Icon={Category}
                            text="Repuestos"
                            conunter={spareParts}
                            color="#F6FAF4"
                            iconColor="#DBE5D3"
                        />
                    </div>
                    <div className="col3">
                        <InfoBox
                            Icon={Eco}
                            text="Ambientes"
                            conunter={environments}
                            color="#F4F6FA"
                            iconColor="#CBD3E1"
                        />
                    </div>
                </div>
            </Container>
        </React.Fragment>
    );
};
