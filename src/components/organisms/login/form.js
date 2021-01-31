import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserActions } from "../../../@actions";
import { Input, Button } from "../../atoms";
import "./form.scss";

export function LoginForm() {
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();
    const authState = useSelector((state) => state.AuthReducer);

    const eHandleSubmit = (e) => {
        e.preventDefault();

        if (
            e.target.email.attributes["aria-invalid"].value === "false" ||
            e.target.password.attributes["aria-invalid"].value === "false"
        ) {
            setErrors([]);
            return false;
        }

        const user = {
            email: e.target.email.value,
            password: e.target.password.value,
        };

        dispatch(UserActions.login(user));
    };

    return (
        <form method="POST" onSubmit={eHandleSubmit}>
            <Input
                identifier="email"
                placeholder="Email"
                type="email"
                error={errors}
                height={50}
                min={5}
                animated
                required
            />
            <Input
                identifier="password"
                placeholder="Contraseña"
                type="password"
                error={errors}
                min={5}
                height={50}
                max={10}
                animated
                required
            />
            <Button
                text="Login"
                variant="secondary btn-big"
                style={{ height: 50 }}
            />
            {authState.status === false && authState.error === "general" && (
                <div className="error_message">
                    <span>{authState.message}</span>
                </div>
            )}
        </form>
    );
}
