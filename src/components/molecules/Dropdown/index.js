import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Text } from "../../atoms";
import { ArrowDropDown } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { UserActions } from "../../../@actions";
import "./dropdown.scss";

export const Dropdown = ({
    image = false,
    username = false,
    click = false,
}) => {
    const [isActive, setIsActive] = useState(false);
    const user = useSelector((state) => state.AuthReducer);
    const dispatch = useDispatch();

    const Parent = ({ children, className = "" }) => {
        return click ? (
            <div onClick={() => setIsActive(!isActive)} className={className}>
                {children}
            </div>
        ) : (
            <div className={className + " custom_hover_trigger"}>
                {children}
            </div>
        );
    };

    const logout = (_) => {
        dispatch(UserActions.logout(user.user._id));
    };

    return (
        <Parent className="trigger_dropdown">
            {image && <Avatar size={30} />}
            {username && user.status && (
                <Text
                    type="span"
                    weight="600"
                    color="#83889c"
                    size={14}
                    text={user.user.name}
                />
            )}
            <ArrowDropDown />

            <ul className="dropdown">
                <li>
                    <Link to="/profile">Perfil</Link>
                </li>
                <div className="rule"></div>
                <li onClick={() => logout()}>
                    <div>Cerrar sesión</div>
                </li>
            </ul>
        </Parent>
    );
};
