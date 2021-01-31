import React, { useState } from "react";
import { Button } from "../../atoms";
import { MaintenancesList } from "../../organisms";
import { AddCircle } from "@material-ui/icons";
import { modalActions } from "../../../@actions";
import "./maintenance.scss";
import { useDispatch } from "react-redux";

export const MaintenanceTemplate = ({
    maintenances = [],
    maintenanceTypes = [],
}) => {
    const dispatch = useDispatch();
    const [actualTab, setActualTab] = useState("maintenances");

    const addMaintenance = (_) => {
        dispatch(modalActions.showModal("AddMaintenance"));
    };

    const addMaintenanceType = (_) => {
        dispatch(modalActions.showModal("AddMaintenanceType"));
    };

    const MaitenanceData = maintenances.map((maitenance) => {
        return {
            ...maitenance,
            machineCode: maitenance.machine.machineCode,
            maintenanceTypeName: maitenance.maintenanceType.name,
        };
    });

    return (
        <>
            <div className="center_end mb_20">
                <Button
                    text="Agregar tipo mantenimeinto"
                    variant="secondary mr_10"
                    Icon={AddCircle}
                    onClick={addMaintenanceType}
                />
                <Button
                    text="Agregar mantenimeinto"
                    variant="secondary"
                    Icon={AddCircle}
                    onClick={addMaintenance}
                />
            </div>

            <div className="custon_tabs">
                <div
                    className="custom_tab_item"
                    onClick={() => setActualTab("maintenances")}
                >
                    <span
                        className={
                            actualTab === "maintenances" ? "active_tab" : ""
                        }
                    >
                        Mantenimeintos
                    </span>
                </div>
                <div
                    className="custom_tab_item"
                    onClick={() => setActualTab("maintenanceTypes")}
                >
                    <span
                        className={
                            actualTab === "maintenanceTypes" ? "active_tab" : ""
                        }
                    >
                        Tipos de mantenimeinto
                    </span>
                </div>
            </div>

            <MaintenancesList
                items={
                    actualTab === "maintenances"
                        ? MaitenanceData
                        : maintenanceTypes
                }
                tab={actualTab}
            />
        </>
    );
};
