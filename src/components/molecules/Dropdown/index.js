import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Avatar, Text } from "../../atoms";
import { ArrowDropDown } from "@material-ui/icons";
import "./dropdown.scss";

export const Dropdown = ({
    image = false,
    username = false,
    click = false,
}) => {
    const [isActive, setIsActive] = useState(false);
    const user = useSelector((state) => state.AuthReducer);

    const Parent = ({ children, className = "" }) => {
        return click ? (
            <div onClick={() => setIsActive(!isActive)} className={className}>
                {children}
            </div>
        ) : (
            <div
                onMouseEnter={() => setIsActive(!isActive)}
                onMouseLeave={() => setIsActive(!isActive)}
                className={className}
            >
                {children}
            </div>
        );
    };

    return (
        <div>
            <Parent className="trigger_dropdown">
                {image && <Avatar size={30} />}
                {username && user.status && (
                    <Text
                        type="span"
                        weight="500"
                        color="#83889c"
                        text={user.user.name}
                    />
                )}
                <ArrowDropDown />
            </Parent>

            {isActive && <div>list</div>}
        </div>
    );
};
