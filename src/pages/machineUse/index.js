import React, { useEffect, useState } from "react";
import { Input, Text, Button, TextArea } from "../../components/atoms";
import { useDispatch, useSelector } from "react-redux";
import { ArrowBack } from "@material-ui/icons";
import { useParams } from "react-router-dom";
import { history } from "../../helpers";
import { alertActions, machineActions, UserActions } from "../../@actions";
import "./machineUse.scss";

export const MachineUse = (_) => {
    const steps = {
        one: 1,
        two: 2,
        three: 3,
    };

    const dispatch = useDispatch();
    const { id } = useParams();
    const machine = useSelector((state) => state.MachineOneReducer);
    const userLogged = useSelector((state) => state.AuthReducer);
    const userGuest = useSelector((state) => state.AuthMachineReducer);
    const [user, setUser] = useState(userLogged ? userLogged : userGuest);
    const [step, setStep] = useState(steps.one);

    useEffect(
        (_) => {
            if (id) {
                dispatch(machineActions.getMachineNoAuth(id));
            }
        },
        [dispatch, id]
    );
    useEffect(
        (_) => {
            if (userGuest.status && !userLogged.status) {
                setUser(userGuest);
            }
        },
        [userGuest, userLogged]
    );

    const eHandleSubmit = (e) => {
        e.preventDefault();
        dispatch(
            UserActions.authenticateMachineUserLogin({
                email: e.target.email.value,
                password: e.target.password.value,
            })
        );
    };

    const eHandleSubmitUse = (e) => {
        e.preventDefault();
        const data = {
            token: user.token,
            machineID: machine.machine._id,
            hours: Number(e.target.hours.value),
            note: e.target.notes.value,
        };

        if (data.token !== "") {
            if (
                data.machineID !== "" &&
                data.hours !== "" &&
                data.note !== ""
            ) {
                e.target.reset();
                dispatch(machineActions.registerMachineUse(data));
            } else {
                dispatch(
                    alertActions.showAlert({
                        type: "failure",
                        message: "Todos los campos son requeridos",
                    })
                );
            }
        } else {
            dispatch(
                alertActions.showAlert({
                    type: "failure",
                    message: "El token de usuario es requerio.",
                })
            );
        }
    };

    if (machine.state) {
        return (
            <div className="center_absolute_other_page">
                {machine.status && step === steps.one && (
                    <div className="center_absolute">
                        <div className="w100">
                            <div
                                className="back_to_step center_absolute"
                                onClick={() => history.push("/")}
                            >
                                <ArrowBack />
                            </div>
                        </div>
                        <img
                            src={
                                machine.machine.machinePhoto
                                    ? process.env.REACT_APP_API +
                                      machine.machine.machinePhoto.folder +
                                      machine.machine.machinePhoto.filename
                                    : ""
                            }
                            className="image_preview_machine"
                            alt="image_preview_status"
                        />
                        <br />
                        <p
                            className="text_responsive_mobile"
                            style={{ textAlign: "center" }}
                        >
                            La maquina con el código{" "}
                            {machine.machine.machineCode} esta en estado
                        </p>
                        <div className="maintenance_status">
                            <span>{machine.status}</span>
                        </div>

                        {machine.machine.status === "active" && (
                            <button
                                className="btn_return"
                                onClick={() => setStep(steps.two)}
                            >
                                Reportar uso
                            </button>
                        )}
                    </div>
                )}
                {step === steps.two && !user.status && (
                    <div className="center_absolute login_container">
                        <form method="POST" onSubmit={eHandleSubmit}>
                            <div
                                className="back_to_step center_absolute"
                                onClick={() => setStep(steps.one)}
                            >
                                <ArrowBack />
                            </div>
                            <Text type="h2" text="Identificarme" size={20} />
                            <Input
                                type="email"
                                identifier="email"
                                min={5}
                                max={50}
                                animated
                                placeholder="Email"
                            />
                            <Input
                                type="password"
                                identifier="password"
                                min={5}
                                max={50}
                                animated
                                placeholder="Contraseña"
                            />
                            <Button
                                text="Validar"
                                variant="secondary btn-big"
                            />
                        </form>
                    </div>
                )}
                {user.status && step !== steps.one && (
                    <div className="center_absolute login_container">
                        <form method="POST" onSubmit={eHandleSubmitUse}>
                            <div
                                className="back_to_step center_absolute"
                                onClick={() => setStep(steps.one)}
                            >
                                <ArrowBack />
                            </div>
                            <Text
                                type="h2"
                                text={"Bienvenido " + user.user.name}
                            />
                            <Input
                                type="text"
                                animated
                                identifier="machineCode"
                                placeholder="Codigo de la maquina"
                                min={1}
                                max={100}
                                defaultValue={machine.machine.machineCode}
                                readonly
                            />
                            <Input
                                type="number"
                                animated
                                identifier="hours"
                                placeholder="Horas de uso"
                                min={1}
                                max={100}
                            />
                            <TextArea placeholder="Notas" identifier="notes" />
                            <Button
                                text="Reportar uso"
                                variant="secondary btn-big"
                            />
                        </form>
                    </div>
                )}
            </div>
        );
    } else {
        return <></>;
    }
};
