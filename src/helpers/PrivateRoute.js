import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { MainLayout } from "../layouts";

export const PrivateRoute = ({ component: Component, ...rest }) => {
    const user = useSelector((state) => state.AuthReducer);
    return (
        <Route
            {...rest}
            render={(props) =>
                user.status ? (
                    <MainLayout>
                        <Component {...props} />
                    </MainLayout>
                ) : (
                    <Redirect to="/login" />
                )
            }
        />
    );
};
