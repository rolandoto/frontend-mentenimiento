import React, { useEffect, useMemo, useState } from "react";
import "./maitenances.scss";
import { Add } from "@material-ui/icons";
import { alertActions, machineActions } from "../../../../@actions";
import { MaitenancePerHour } from "../MaitenancePerHour";
import { Button } from "../../../atoms";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { ListDetail } from "../../../organisms";
import { useDispatch, useSelector } from "react-redux";
import * as cx from "classnames";

export const MaitenancePartial = ({ machine }) => {
    const dispatch = useDispatch();
    const [preconfiguredMaitenances, setPreconfiguredMaitenances] = useState(
        []
    );
    const [maintenancesDetail, setMaintenancesStatus] = useState([]);
    const [maintenanceDetail, setMaintenanceDetail] = useState(false);
    const maintenancesReducer = useSelector(
        (state) => state.MaitenancesAllReducer
    );

    useMemo(
        (_) => {
            if (machine.preconfiguredMaitenances) {
                let newMaitenances = [];
                machine.preconfiguredMaitenances.forEach((maintenance) => {
                    newMaitenances.push(
                        <MaitenancePerHour
                            key={maintenance._id}
                            hours={maintenance.hours}
                            selectedMaitenance={maintenance.maintenance}
                            maitenances={
                                maintenancesReducer.status
                                    ? maintenancesReducer.maintenances
                                    : []
                            }
                        />
                    );
                });
                setPreconfiguredMaitenances(newMaitenances);
            }
        },
        [
            machine.preconfiguredMaitenances,
            maintenancesReducer.maintenances,
            maintenancesReducer.status,
        ]
    );

    const evaluateMaitenances = (maitenancesInput) => {
        let preconfiguredMaitenances = [];
        if (maitenancesInput.length) {
            maitenancesInput.forEach((maitenance) => {
                preconfiguredMaitenances.push(JSON.parse(maitenance.value));
            });
        } else {
            preconfiguredMaitenances.push(JSON.parse(maitenancesInput.value));
        }

        return preconfiguredMaitenances;
    };

    const evalueMaitenancesContentFunc = (maitenances = []) => {
        for (let maitenance of maitenances) {
            if (!maitenance.hours) {
                if (Number(maitenance.hours) > 0) {
                    return false;
                }
            }

            if (!maitenance.maintenance) {
                if (maitenance.maintenance.length === 0) {
                    return false;
                }
            }
        }

        return true;
    };

    const eHandleSavePreconfiguredMaitenances = (e) => {
        e.preventDefault();
        const preconfiguredMaitenances = e.target.preconfigureMaitenance;
        if (preconfiguredMaitenances) {
            const convertMaitenances = evaluateMaitenances(
                preconfiguredMaitenances
            );
            if (convertMaitenances) {
                const evalueMaitenancesContent = evalueMaitenancesContentFunc(
                    convertMaitenances
                );

                if (evalueMaitenancesContent) {
                    dispatch(
                        machineActions.updatePreconfiguredMaitenances({
                            machineID: machine._id,
                            preconfiguredMaitenances: convertMaitenances,
                        })
                    );
                } else {
                    dispatch(
                        alertActions.showAlert({
                            type: "failure",
                            message:
                                "Debes seleccionar los mantenimientos antes de guardarlos.",
                        })
                    );
                }
            } else {
                dispatch(
                    alertActions.showAlert({
                        type: "failure",
                        message:
                            "La configuración de los mantenimientos es incorrecta.",
                    })
                );
            }
        }
    };

    useEffect(() => {
        if (machine.maintenances) {
            const setMaintenancesDetail = machine.maintenances.map(
                (maintenance) => {
                    if (maintenance.complete) {
                        maintenance.statusDetail = "Completado";
                    } else {
                        maintenance.statusDetail = "En curso";
                    }
                    return maintenance;
                }
            );
            setMaintenancesStatus(setMaintenancesDetail);
        }
    }, [machine.maintenances]);

    const showMaintenanceDetails = (maintenance) => {
        setMaintenanceDetail({
            show: true,
            ...maintenance,
        });
    };

    const eHandleCheckTask = (evt, machineID, maintenanceID, taskID) => {
        if ((machineID, maintenanceID, taskID)) {
            const setTaskStatus = {
                completed: evt.target.checked,
                machineID,
                maintenanceID,
                taskID,
            };
            const completeMaintenanceTask = maintenancesDetail.map(
                (maintenance) => {
                    if (maintenance._id === maintenanceID) {
                        maintenance.check_list = maintenance.check_list.map(
                            (task) => {
                                if (task.id === taskID) {
                                    task.complete = setTaskStatus.completed;
                                }
                                return task;
                            }
                        );
                    }
                    return maintenance;
                }
            );
            setMaintenancesStatus(completeMaintenanceTask);
            console.log(setTaskStatus)
        } else {
            dispatch(
                alertActions.showAlert({
                    type: "failure",
                    message: "Ha ocurrido un error, intentalo nuevamente.",
                })
            );
        }
    };

    return (
        <div className="rows">
            <div className="col4">
                <div className="center_elements direction_row flex-start">
                    <span>Mantenimientos por hora</span>
                    <span
                        className="custom_add_maitenance"
                        onClick={() =>
                            preconfiguredMaitenances.length < 5
                                ? setPreconfiguredMaitenances([
                                      ...preconfiguredMaitenances,
                                      <MaitenancePerHour
                                          key={preconfiguredMaitenances.length}
                                          maitenances={
                                              maintenancesReducer.status
                                                  ? maintenancesReducer.maintenances
                                                  : []
                                          }
                                      />,
                                  ])
                                : alert(
                                      "No puedes agregar mas de 5 mantenimientos"
                                  )
                        }
                    >
                        <Add />
                    </span>
                </div>
                <form
                    method="POST"
                    onSubmit={eHandleSavePreconfiguredMaitenances}
                >
                    <div>{preconfiguredMaitenances}</div>

                    {preconfiguredMaitenances.length > 0 && (
                        <Button text="Guardar" variant="secondary btn-big" />
                    )}
                </form>
            </div>

            <div className="col3">
                <div className="center_elements flex-start mnh-25">
                    <span>Mantenimientos</span>
                </div>

                <ListDetail
                    show={showMaintenanceDetails}
                    items={maintenancesDetail}
                    keysToShow={["statusDetail", "name"]}
                />
            </div>

            <div className="col5">
                <div className="center_elements flex-start mnh-25">
                    <span>Detalles</span>
                </div>
                {maintenanceDetail.show && (
                    <div className="maitenance_detail_card">
                        <p>
                            <strong className="f600">
                                Nombre del mantenimiento:
                            </strong>{" "}
                            {maintenanceDetail.name}
                        </p>
                        <p className="mt-10">
                            <strong className="f600">
                                Tipo de mantenimiento:
                            </strong>{" "}
                            {maintenanceDetail.maintenanceType.name}
                        </p>
                        <p className="mt-10">
                            <strong className="f600">Estado:</strong>{" "}
                            {maintenanceDetail.statusDetail}
                        </p>

                        <h3 className="mt-10 f600">Tareas a realizar</h3>
                        {maintenanceDetail.check_list.map((task) => (
                            <div className="check_list_item mt-10">
                                <FormControlLabel
                                    key={task._id}
                                    control={
                                        !task.complete ? (
                                            <Checkbox
                                                checked={task.complete}
                                                onChange={(e) =>
                                                    eHandleCheckTask(
                                                        e,
                                                        machine._id,
                                                        maintenanceDetail._id,
                                                        task.id
                                                    )
                                                }
                                                name="checkTask"
                                                color="primary"
                                            />
                                        ) : <div></div>
                                    }
                                    label={task.name}
                                    className={cx(
                                        task.complete
                                            ? "text_decoration_complete"
                                            : ""
                                    )}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
