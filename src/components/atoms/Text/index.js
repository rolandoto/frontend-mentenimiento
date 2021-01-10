import React from "react";

export const Text = ({ type, text, color, weight }) => {
    return React.createElement(
        type,
        {
            style: {
                color: color ? color : "#333",
                fontWeight: weight ? weight : 400,
            },
        },
        text
    );
};
