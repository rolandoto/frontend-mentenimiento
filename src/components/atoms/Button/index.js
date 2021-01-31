import React from "react";
import "./button.scss";

export const Button = ({
    text = "default",
    style = {},
    variant,
    Icon,
    onClick,
}) => {
    return (
        <button
            className={"button btn-" + variant}
            style={style}
            onClick={onClick}
        >
            {Icon && <Icon />}
            <span>{text}</span>
        </button>
    );
};
