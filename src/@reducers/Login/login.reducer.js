import { LoginTypes } from "../../@types";

export const AuthReducer = (status = {}, action) => {
    switch (action.type) {
        case LoginTypes.LOGIN_REQUEST:
            return {
                loading: true,
            };
        case LoginTypes.LOGIN_SUCCESS:
            return {
                status: action.response.status,
                token: action.response.token,
                user: action.response.user,
                message: action.response.message,
            };
        case LoginTypes.LOGIN_FAILURE:
            return {
                status: action.response.status,
                error: action.response.error,
                message: action.response.message,
            };
        default:
            return status;
    }
};
