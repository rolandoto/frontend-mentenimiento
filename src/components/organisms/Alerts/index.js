import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Close } from "@material-ui/icons";
import { alertActions } from "../../../@actions";
import "./alert.scss";

export const Alert = (_) => {
    const alert = useSelector((state) => state.AlertReducer);
    const dispatch = useDispatch();
    const flashAlert = useRef();
    const [actual, setActual] = useState("running");
    const [type, setType] = useState("success");

    useEffect(
        (_) => {
            if (alert.show) {
                setActual("running");
                setType(alert.type);
                flashAlert.current.addEventListener("animationend", (_) => {
                    dispatch(alertActions.hideAlert());
                });
            }
        },
        [alert, dispatch]
    );

    const animation = (state) => {
        setActual(state ? "running" : "paused");
    };

    if (alert.show) {
        return (
            <div
                className={"flash_alert " + type + "-alert"}
                onMouseEnter={() => animation(false)}
                onMouseLeave={() => animation(true)}
            >
                <div
                    onClick={() => dispatch(alertActions.hideAlert())}
                    className="icon_close_alert"
                >
                    <Close />
                </div>
                <div role="alert" className="alert_message">
                    {alert.message}
                </div>
                <div
                    className="progresBar"
                    ref={flashAlert}
                    style={{
                        animationPlayState: actual,
                    }}
                ></div>
            </div>
        );
    } else {
        return <></>;
    }
};
