import React, { useEffect, useRef, useState } from "react";
import { KeyboardArrowDown } from "@material-ui/icons";
import "./select.scss";

export const Option = ({ value = "", text = "" }) => (
    <option value={value}>{text}</option>
);

function getProps(children) {
    return children.map((c) => {
        return c.props;
    });
}

export const Select = ({
    children,
    identifier = "",
    placeholder = "",
    heigth,
    defaultSelected = "",
}) => {
    const selectRef = useRef();
    const [selectedOption, setSelectedOption] = useState(defaultSelected);
    const [selectedOptionPlaceholder, setSelectedOptionPlaceholder] = useState(
        placeholder
    );
    const [options, setOptions] = useState([]);
    const [showOptions, setShowOptions] = useState(false);

    useEffect(
        (_) => {
            const proccessOptions = children
                ? Array.isArray(children)
                    ? getProps(children)
                    : children.props
                : [];
            setOptions(proccessOptions);
            if (defaultSelected) {
                if (Array.isArray(proccessOptions)) {
                    const getSelectedPlaceholder = proccessOptions.find(
                        (option) => {
                            return option.value === defaultSelected;
                        }
                    );

                    setSelectedOptionPlaceholder(getSelectedPlaceholder.text);
                } else {
                    setSelectedOptionPlaceholder(proccessOptions.text);
                }
            }
        },
        [defaultSelected, children]
    );

    return (
        <div className="select_container">
            <select
                name={identifier}
                value={selectedOption}
                ref={selectRef}
                onChange={() => null}
                placeholder={placeholder}
            >
                <option value="" defaultChecked>
                    Select option
                </option>
                {children}
            </select>

            <div
                className="select_component"
                style={{ height: heigth }}
                onClick={() => setShowOptions(!showOptions)}
            >
                <span>{selectedOptionPlaceholder}</span>
                <div className="arrow_down_icon">
                    <KeyboardArrowDown />
                </div>

                {showOptions && (
                    <div className="show_options_container">
                        {options.map((option) => (
                            <div
                                key={option.value}
                                className="select_option_item"
                                onClick={() => [
                                    setSelectedOption(option.value),
                                    setSelectedOptionPlaceholder(option.text),
                                    setShowOptions(false),
                                ]}
                            >
                                <span>{option.text}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
