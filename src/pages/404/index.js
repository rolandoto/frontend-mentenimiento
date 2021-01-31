import React from "react";
import { Link } from "react-router-dom";
import Lottie from "react-lottie-player";
import animationData from "./28134-astronaut.json";
import "./_404.scss";

export const NotFoundPage = (_) => {
    return (
        <div className="center_absolute_other_page">
            <Lottie
                loop
                animationData={animationData}
                play
                style={{ width: 300 }}
            />
            <p className="text_responsive_mobile">
                Estas navegando en lugares desconocidos
            </p>
            <Link to="/" className="btn_return">
                Ir a mi planeta
            </Link>
        </div>
    );
};
