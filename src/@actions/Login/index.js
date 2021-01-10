import { LoginTypes } from "../../@types";
import { LoginService } from "../../@services";
import { cookieHelper, history } from "../../helpers";

export const LoginActions = {
    login,
    authenticate,
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

function authenticate(token) {
    return (dispatch) => {
        dispatch(request());
        LoginService.authenticate(token)
            .then((response) => {
                if (response.data.status) {
                    dispatch(success(response.data));
                    history.push("/");
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
