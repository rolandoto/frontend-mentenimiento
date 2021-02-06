import React, { useRef, useState, useEffect } from "react";
import "./login.scss";
import { Text } from "../../atoms";
import { LoginForm } from "../../organisms";
import Lottie from "react-lottie-player";
import animationData from "./43885-laptop-working.json";

export const LoginTemplate = (_) => {
    const trackWidth = useRef();
    const [track, setTrack] = useState(0);

    useEffect(
        (_) => {
            setTrack(trackWidth.current.scrollWidth);

            window.addEventListener("resize", (_) => {
                if (trackWidth.current) {
                    setTrack(trackWidth.current.scrollWidth);
                } else {
                    window.removeEventListener("resize", (_) => false);
                }
            });
        },
        [trackWidth]
    );

    return (
        <div className="login_template rows_evely">
            <div className="col5 center_elements w100OnMobile">
                <div className="login_container_desing">
                    <Text
                        type="h2"
                        text="Bienvenido de nuevo"
                        color="#FF6719"
                        weight="600"
                        size={30}
                    />
                    <div className="separator_top"></div>
                    <LoginForm />
                </div>
            </div>
            <div
                className="position_relative col6 center_elements hide_on_mobile"
                ref={trackWidth}
            >
                <Lottie
                    loop
                    animationData={animationData}
                    play
                    style={{ width: track, height: track }}
                />
            </div>
        </div>
    );
};
