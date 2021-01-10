import React from "react";
import "./button.scss";

export const Button = ({ text = "default", style = {} }) => {
    return React.createElement(
        "button",
        {
            style: style,
            className: "button",
        },
        text
    );
};
