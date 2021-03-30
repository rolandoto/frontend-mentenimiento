import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { PrivateRoute, cookieHelper } from "./helpers";
import { UserActions } from "./@actions";
import { Modal, ModalDetails } from "./layouts";
import { Alert } from "./components/organisms";
import {
    Home,
    Login,
    Environments,
    Profile,
    Machines,
    MachineUse,
    NotFoundPage,
    Maintenances,
    SpareParts,
} from "./pages";

export const App = (_) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.AuthReducer);

    useEffect(
        (_) => {
            const user = cookieHelper.getCookie("user");
            if (user) {
                dispatch(UserActions.authenticate(user));
            }
        },
        [dispatch]
    );

    return (
        <>
            {user.loading && <div className="loading_screen"></div>}

            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/machineUse/:id" component={MachineUse} />

                <PrivateRoute exact path="/" component={Home} />
                <PrivateRoute
                    exact
                    path="/environments"
                    component={Environments}
                />
                <PrivateRoute exact path="/profile" component={Profile} />
                <PrivateRoute exact path="/machines" component={Machines} />
                <PrivateRoute exact path="/spareParts" component={SpareParts} />
                <PrivateRoute
                    exact
                    path="/maintenances"
                    component={Maintenances}
                />

                <Route path="*" component={NotFoundPage} />
            </Switch>

            <Modal />
            <ModalDetails />
            <Alert />
        </>
    );
};
