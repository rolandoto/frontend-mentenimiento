import { LoginTypes } from "../../@types";
import { LoginService } from "../../@services";
import { cookieHelper, history, socket } from "../../helpers";

export const LoginActions = {
    login,
    authenticate,
    logout,
};

function login(user) {
    return (dispatch) => {
        dispatch(request());
        LoginService.login(user)
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
                dispatch(failure(err.response.data));
            });
    };

    function request() {
        return { type: LoginTypes.LOGIN_REQUEST };
    }
    function success(response) {
        return { type: LoginTypes.LOGIN_SUCCESS, response };
    }
    function failure(response) {
        return { type: LoginTypes.LOGIN_FAILURE, response };
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
        return { type: LoginTypes.USER_LOGOUT };
    }
}

function authenticate(token) {
    return (dispatch) => {
        dispatch(request());
        LoginService.authenticate(token)
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
                dispatch(failure(err.response.data));
            });
    };

    function request() {
        return { type: LoginTypes.LOGIN_REQUEST };
    }
    function success(response) {
        return { type: LoginTypes.LOGIN_SUCCESS, response };
    }
    function failure(response) {
        return { type: LoginTypes.LOGIN_FAILURE, response };
    }
}
