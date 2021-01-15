import React from "react";
import "./text.scss";

export const Text = ({ type, text, color = "", weight, size, colored }) => {
    const customText = (_) => {
        return colored ? (
            <>
                <span className="animated_half_text">
                    {text.substr(0, text.length / 2 + 1)}
                </span>
                {text.substr(text.length / 2 + 1, text.length - 1)}
            </>
        ) : (
            text
        );
    };

    return React.createElement(
        type,
        {
            style: {
                color: color,
                fontSize: size,
                fontWeight: weight ? weight : 400,
            },
        },
        customText()
    );
};
