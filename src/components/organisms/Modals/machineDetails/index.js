import React, { useState } from "react";
import { QRCode } from "react-qr-svg";
import saveSvgAsPng from "save-svg-as-png";
import { Button } from "../../../atoms";
import {
    SparePartsPartial,
    MaitenancePartial,
    AlertAndUsesPartial,
} from "../../../molecules";
import { useSelector } from "react-redux";
import "moment/locale/es";
import "./machineDetails.scss";

export const MachineDetails = (_) => {
    const posibleOptions = {
        maintenance: 1,
        spareParts: 2,
        alertAndErrors: 3,
    };
    const machine = useSelector((state) => state.ModalDetailReducer);
    const [selected, setSelected] = useState(posibleOptions.maintenance);

    const downloadQR = (_) => {
        const getQR = document.getElementById("QRCodeGenerated");
        if (getQR) {
            saveSvgAsPng.saveSvgAsPng(getQR, machine.item._id + ".png", {
                scale: 20,
                encoderOptions: 1,
                backgroundColor: "white",
            });
        }
    };

    return (
        <div className="rows">
            <div className="col10">
                <div className="rows">
                    <ul className="custom_header_triggers col7">
                        <li
                            className={
                                "custom_header_trigger_item" +
                                [
                                    selected === posibleOptions.maintenance
                                        ? " active"
                                        : "",
                                ]
                            }
                            onClick={() =>
                                setSelected(posibleOptions.maintenance)
                            }
                        >
                            Mantenimientos
                        </li>
                        <li
                            className={
                                "custom_header_trigger_item" +
                                [
                                    selected === posibleOptions.spareParts
                                        ? " active"
                                        : "",
                                ]
                            }
                            onClick={() =>
                                setSelected(posibleOptions.spareParts)
                            }
                        >
                            Repuestos
                        </li>
                        <li
                            className={
                                "custom_header_trigger_item" +
                                [
                                    selected === posibleOptions.alertAndErrors
                                        ? " active"
                                        : "",
                                ]
                            }
                            onClick={() =>
                                setSelected(posibleOptions.alertAndErrors)
                            }
                        >
                            Alertas y usos
                        </li>
                    </ul>

                    <div className="rows custom_registered_hours col5">
                        <p className="center_elements">
                            Horas registradas:{" "}
                            <span className="hours_display">
                                {machine.totalHoursRegisted
                                    ? machine.totalHoursRegisted
                                    : 0}
                            </span>
                        </p>
                        <p className="center_elements">
                            Horas trabajadas:{" "}
                            <span className="hours_display">
                                {machine.totalHoursWorking
                                    ? machine.totalHoursWorking
                                    : 0}
                            </span>
                        </p>
                    </div>
                </div>

                <div className="container_content_modal">
                    {selected === posibleOptions.maintenance && (
                        <MaitenancePartial machine={machine.item} />
                    )}
                    {selected === posibleOptions.spareParts && (
                        <SparePartsPartial />
                    )}
                    {selected === posibleOptions.alertAndErrors && (
                        <AlertAndUsesPartial />
                    )}
                </div>
            </div>

            <div className="col2">
                <div className="QR_Download_container absolute_center direction_column">
                    <QRCode
                        id="QRCodeGenerated"
                        value={
                            window.location.origin +
                            "/machineUse/" +
                            machine.item._id
                        }
                        style={{ width: 128 }}
                    />
                    <Button
                        variant="secondary mt-10"
                        text="Descargar QR"
                        onClick={() => downloadQR()}
                    />
                </div>
            </div>
        </div>
    );
};
