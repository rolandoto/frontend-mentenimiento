import React, { useState } from "react";
import "./textarea.scss";

export const TextArea = ({ placeholder = "", identifier }) => {
    const [height, setHeight] = useState(50);

    const evaluateHeight = (text) => {
        if (text.target.scrollHeight !== height) {
            setHeight(text.target.scrollHeight);
        }
    };

    return (
        <div className="input_item">
            <textarea
                name={identifier}
                onChange={(text) => evaluateHeight(text)}
                className="text_area_component"
                placeholder={placeholder}
                style={{ height: height }}
            ></textarea>
        </div>
    );
};
