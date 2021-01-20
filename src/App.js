import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { PrivateRoute, cookieHelper } from "./helpers";
import { LoginActions } from "./@actions";
import { MainLayout, Modal } from "./layouts";
import { Alert } from "./components/organisms";
import { Home, Login, Environments } from "./pages";

export const App = (_) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.AuthReducer);

    useEffect(
        (_) => {
            const user = cookieHelper.getCookie("user");
            if (user) {
                dispatch(LoginActions.authenticate(user));
            }
        },
        [dispatch]
    );

    return (
        <>
            {user.loading && <div className="loading_screen"></div>}
            <Switch>
                <Route path="/login" component={Login} />
                <MainLayout>
                    <PrivateRoute exact path="/" component={Home} />
                    <PrivateRoute
                        exact
                        path="/environments"
                        component={Environments}
                    />
                </MainLayout>
            </Switch>
            <Modal />
            <Alert />
        </>
    );
};
