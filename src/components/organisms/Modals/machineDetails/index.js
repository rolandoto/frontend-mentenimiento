import React, { useEffect, useState } from "react";
import { QRCode } from "react-qr-svg";
import saveSvgAsPng from "save-svg-as-png";
import { Button, Text } from "../../../atoms";
import { useDispatch, useSelector } from "react-redux";
import { ListDetail } from "../../";
import { alertActions, maintenanceActions } from "../../../../@actions";
import Moment from "moment";
import "moment/locale/es";
import "./machineDetails.scss";

export const MachineDetails = (_) => {
    const dispatch = useDispatch();
    const machine = useSelector((state) => state.ModalDetailReducer);
    const machines = useSelector((state) => state.MachineAllReducer);
    const machineData = { ...machine.item };
    const [maintenances, setMaintenances] = useState([]);
    const [spareParts, setSpareParts] = useState([]);

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

    const convertMachineUserDetails = machineData.machineUses.map((use) => {
        return {
            ...use,
            user: use.user.name,
            create_at: Moment(use.create_at).locale("es").format("LL"),
        };
    });

    useEffect(
        (_) => {
            const maitenances = machine.item.maintenances.map((maintenance) => {
                const createAt = Moment(maintenance.create_at)
                    .locale("es")
                    .format("LL");
                const completeAt = maintenance.complete_at
                    ? Moment(maintenance.complete_at).locale("es").format("LL")
                    : " en curso";

                return {
                    ...maintenance,
                    maintenanceTypeName: maintenance.maintenanceType.name,
                    create_at: createAt + " - " + completeAt,
                };
            });
            setMaintenances(maitenances.reverse());
        },
        [machines, machine.item.maintenances]
    );

    useEffect(
        (_) => {
            const spareParts = machine.item.spareParts.map((sparePart) => {
                const createAt = Moment(sparePart.sparePart.create_at)
                    .locale("es")
                    .format("LL");
                return {
                    ...sparePart.sparePart,
                    stockUsed: sparePart.stockUsed,
                    createAt,
                };
            });
            setSpareParts(spareParts);
        },
        [machines, machine.item.spareParts]
    );

    const onCompleteCheck = (item) => {
        if (item._id) {
            dispatch(maintenanceActions.completeMaitenance(item._id));
        } else {
            dispatch(
                alertActions.showAlert({
                    type: "failure",
                    message: "El ID del mantenimeinto es requerido.",
                })
            );
        }
    };

    return (
        <div className="rows">
            <div className="col10">
                <div className="main_container_detail_grid">
                    <div className="uses_section">
                        <Text type="h2" text="Reportes usos" />
                        <ListDetail
                            items={convertMachineUserDetails}
                            keysToShow={["user", "note", "create_at"]}
                        />
                        {convertMachineUserDetails.length === 0 && (
                            <Text type="p" text="No hay reportes" />
                        )}
                    </div>
                    <div className="maintenances_section">
                        <Text type="h2" text="Mantenimientos" />
                        <ListDetail
                            items={maintenances}
                            keysToShow={["maintenanceTypeName", "create_at"]}
                            complete={onCompleteCheck}
                        />
                        {maintenances.length === 0 && (
                            <Text type="p" text="No hay mantenimientos" />
                        )}
                    </div>
                    <div className="spare_parts_section">
                        <Text type="h2" text="Repuestos usados" />
                        <ListDetail
                            items={spareParts}
                            keysToShow={["name", "stockUsed", "createAt"]}
                        />
                        {spareParts.length === 0 && (
                            <Text type="p" text="No se han usado repuestos." />
                        )}
                    </div>
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
