import React from "react";
import { useSelector } from "react-redux";
import './avatar.scss'

export const Avatar = ({size = 50}) => {
    const user = useSelector((state) => state.AuthReducer);

    const loadPhoto = (_) => {
        return user.status && user.user.profileImage
            ? user.user.profileImage
            : "/img/user.png";
    };

    return (
        <div
            className="avatar_image"
            style={{
                width: size,
                height: size,
                borderRadius: size / 2,
            }}
        >
            <img
                src={loadPhoto()}
                alt="User profile"
                className="responsive_image"
            />
        </div>
    );
};
