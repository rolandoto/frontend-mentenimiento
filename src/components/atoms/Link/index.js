import React from "react";
import { NavLink } from "react-router-dom";
import { Text } from "../";
import "./link.scss";

export const Link = ({ path = "/", Icon, text = "", organized }) => {
    const Parent = ({ children }) => {
        return organized ? (
            <li className="custom_nav_li">{children}</li>
        ) : (
            children
        );
    };

    return (
        <Parent>
            <NavLink exact to={path}>
                <Icon />
                <Text type="span" text={text} />
            </NavLink>
        </Parent>
    );
};
