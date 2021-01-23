import React from "react";
import { ProfileData , EditProfile} from "../../organisms";
import { useSelector } from "react-redux";

export const ProfileTemplate = (_) => {
    const user = useSelector((state) => state.AuthReducer);

    return (
        <div className="rows">
            <div className="col5">
                <ProfileData user={user.user} />
            </div>

            <div className="col7">
                <EditProfile user={user.user} />
            </div>
        </div>
    );
};
