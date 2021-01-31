import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Text } from "../../atoms";
import { ArrowDropDown } from "@material-ui/icons";
import cx from "classnames";
import { UserActions } from "../../../@actions";
import "./dropdown.scss";

export const Dropdown = ({
    children,
    image = false,
    username = false,
    click = false,
    Icon,
    extraClass,
    logoutAction,
    circleRed,
    width,
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
        <Parent
            className={cx("trigger_dropdown", extraClass ? extraClass : "")}
        >
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

            {!Icon && <ArrowDropDown />}
            {Icon && (
                <div className="circle_red_icon">
                    <div className="icon_section_item">
                        {circleRed && (
                            <div className="circle_red_notification"></div>
                        )}
                        <Icon />
                    </div>
                </div>
            )}

            <ul className="dropdown" style={{ width: width }}>
                {children}
                {logoutAction && (
                    <>
                        <div className="rule"></div>
                        <li
                            onClick={() => logout()}
                            className="list_dropdown_item"
                        >
                            <div>Cerrar sesión</div>
                        </li>
                    </>
                )}
            </ul>
        </Parent>
    );
};
