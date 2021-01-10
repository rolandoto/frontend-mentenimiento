import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

export const PrivateRoute = ({
    component: Component,
    ...rest
}) => {
    const user = useSelector((state) => state.AuthReducer);

    return (
        <Route
            {...rest}
            render={(props) =>
                user.status ? <Component {...props} /> : <Redirect to="/login" />
            }
        />
    );
};
