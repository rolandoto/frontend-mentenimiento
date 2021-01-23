import { UserTypes } from "../../@types";
import { alertActions } from "../";
import { UserService } from "../../@services";
import { request, callback } from "../";
import { cookieHelper, history, socket } from "../../helpers";

export const UserActions = {
    login,
    authenticate,
    logout,
    updateUser,
};

function login(user) {
    return (dispatch) => {
        dispatch(request());
        UserService.login(user)
            .then((response) => {
                if (response.data.status) {
                    cookieHelper.createCookie("user", response.data.token);
                    dispatch(success(response.data));
                    history.push("/");
                    socket.connect();
                    sessionStorage.setItem("userID", response.data.user._id);
                    socket.emit("userConnect", {
                        _id: response.data.user._id,
                        _socketID: sessionStorage.getItem("SocketID"),
                    });
                } else {
                    dispatch(failure(response.data));
                }
            })
            .catch((err) => {
                if (err.response) {
                    dispatch(failure(err.response.data));
                } else {
                    dispatch(
                        failure({
                            status: false,
                            error: "general",
                            message:
                                "Ha ocurrido un error, intentalo nuevamente.",
                        })
                    );
                }
            });
    };

    function request() {
        return { type: UserTypes.LOGIN_REQUEST };
    }
    function success(response) {
        return { type: UserTypes.LOGIN_SUCCESS, response };
    }
    function failure(response) {
        return { type: UserTypes.LOGIN_FAILURE, response };
    }
}

function logout(_id) {
    return (dispatch) => {
        cookieHelper.deleteCookie("user");
        if (!cookieHelper.getCookie("user")) {
            dispatch(logout());
            if (sessionStorage.getItem("userID")) {
                sessionStorage.removeItem("userID");
            }
            history.push("/");
            socket.emit("userDisconect", {
                _id,
                _socketID: sessionStorage.getItem("SocketID"),
            });
            socket.disconnect();
        }
    };

    function logout() {
        return { type: UserTypes.USER_LOGOUT };
    }
}

function authenticate(token) {
    return (dispatch) => {
        dispatch(request());
        UserService.authenticate(token)
            .then((response) => {
                if (response.data.status) {
                    dispatch(success(response.data));
                    history.push("/");
                    sessionStorage.setItem("userID", response.data.user._id);
                    socket.on("connect", () => {
                        socket.emit("userConnect", {
                            _id: response.data.user._id,
                            _socketID: sessionStorage.getItem("SocketID"),
                        });
                    });
                } else {
                    dispatch(failure(response.data));
                }
            })
            .catch((err) => {
                sessionStorage.removeItem("userID");
                cookieHelper.deleteCookie("user");
                if (err.response) {
                    dispatch(failure(err.response.data));
                } else {
                    dispatch(
                        failure({
                            status: false,
                            error: "general",
                            message:
                                "Ha ocurrido un error, intentalo nuevamente.",
                        })
                    );
                }
            });
    };

    function request() {
        return { type: UserTypes.LOGIN_REQUEST };
    }
    function success(response) {
        return { type: UserTypes.LOGIN_SUCCESS, response };
    }
    function failure(response) {
        return { type: UserTypes.LOGIN_FAILURE, response };
    }
}

function updateUser(data) {
    return (dispatch) => {
        dispatch(request(UserTypes.USERUPDATE_REQUEST));

        UserService.updateUser(data)
            .then((response) => {
                if (response.data.status) {
                    dispatch(
                        callback(UserTypes.LOGIN_SUCCESS, {
                            ...response.data,
                            update: true,
                        })
                    );
                    dispatch(
                        alertActions.showAlert({
                            type: "success",
                            message: response.data.message,
                        })
                    );
                } else {
                    dispatch(
                        alertActions.showAlert({
                            type: "failure",
                            message: response.data.message,
                        })
                    );
                }
            })
            .catch((err) => {
                if (err.response) {
                    dispatch(
                        alertActions.showAlert({
                            type: "failure",
                            message: err.response.data.message,
                        })
                    );
                } else {
                    dispatch(
                        alertActions.showAlert({
                            type: "failure",
                            message:
                                "Ha ocurrido un error, intentalo nuevamente",
                        })
                    );
                }
            });
    };
}
