import { UserTypes } from "../../@types";

export const AuthReducer = (status = {}, action) => {
    switch (action.type) {
        case UserTypes.LOGIN_REQUEST:
            return {
                loading: true,
            };
        case UserTypes.LOGIN_SUCCESS:
            const user = action.response.update
                ? { ...status, user: action.response.user }
                : {
                      status: action.response.status,
                      token: action.response.token,
                      user: action.response.user,
                      message: action.response.message,
                  };

            return user;
        case UserTypes.LOGIN_FAILURE:
            return {
                status: action.response.status,
                error: action.response.error,
                message: action.response.message,
            };
        default:
            return status;
    }
};
