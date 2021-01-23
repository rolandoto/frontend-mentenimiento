import React, { useState, useEffect, useRef } from "react";
import cx from 'classnames';
import "./input.scss";

export const Input = ({
    type = "text",
    placeholder = "",
    identifier = "",
    animated = false,
    error,
    min = 1,
    max = min + 1,
    height,
    defaultValue = "",
    ...rest
}) => {
    const textRef = useRef();

    const [errors, setErrors] = useState(false);
    const [isValid, setIsValid] = useState(false);

    const [inputValue, setInputValue] = useState(defaultValue);

    const evaluateInput = (_) => {
        if (textRef.current) {
            if (!textRef.current.classList.contains("animated")) {
                textRef.current.classList.add("animated");
            }
        }
    };

    const blurEvent = (_) => {
        if (textRef.current) {
            if (inputValue.length === 0) {
                if (textRef.current.classList.contains("animated")) {
                    textRef.current.classList.remove("animated");
                }
            }
        }
    };

    const changeValue = (e) => {
        setInputValue(e.target.value);
    };

    const evaluateInputErrors = (e) => {
        const originalValue = e.target.value;

        if (originalValue.length < min) {
            setErrors({
                message: `El campo ${placeholder} debe contener mínimo ${min} caracteres.`,
            });
            setIsValid(false);
            return false;
        }

        if (identifier === "email") {
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!re.test(String(originalValue).toLowerCase())) {
                setErrors({
                    message: `El formato del email es incorrecto.`,
                });
                setIsValid(false);
                return false;
            }
        }

        if (identifier !== "email") {
            if (originalValue.length > max) {
                setErrors({
                    message: `El campo ${placeholder} solo puede contener ${max} caracteres.`,
                });

                const newValue = originalValue.substr(0, max);
                setInputValue(newValue);
                setTimeout((_) => {
                    setErrors(false);
                }, 1000);
                setIsValid(false);
                return false;
            }
        }

        setIsValid(true);
        setErrors(false);
    };

    useEffect(() => {
        if (error) {
            const checkErr = error.find((err) => {
                return err.type === identifier;
            });

            if (checkErr !== undefined) {
                setErrors(checkErr);
            } else {
                setErrors(false);
            }
        }
    }, [error, identifier]);

    return (
        <div
            className={cx(errors ? "input_item error_margin" : "input_item",
            type === "hidden" ? "hide_element" : "")}
            style={{ height: height }}
        >
            {animated && (
                <span
                    ref={textRef}
                    className={
                        errors
                            ? "animated_text error_text animated"
                            : "animated_text animated"
                    }
                >
                    {placeholder}
                </span>
            )}
            {React.createElement("input", {
                "aria-invalid": isValid,
                type,
                placeholder: placeholder && !animated ? placeholder : null,
                name: identifier ? identifier : null,
                id: identifier ? identifier : null,
                className: errors ? "errorInput" : "",
                ...rest,
                value: inputValue,
                onClick: () => evaluateInput(),
                onChange: (e) => [
                    evaluateInput(),
                    changeValue(e),
                    evaluateInputErrors(e),
                ],
                onBlur: () => blurEvent(),
            })}
            {errors && <span className="error">{errors.message}</span>}
        </div>
    );
};
