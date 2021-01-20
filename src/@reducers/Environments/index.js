import { EnvironmentTypes } from "../../@types";

export const EnvironmentsAllReducer = (state = {}, action) => {
    switch (action.type) {
        case EnvironmentTypes.GETENVIRONMENTS_REQUEST:
            return {
                loading: true,
            };
        case EnvironmentTypes.GETENVIRONMENTS_SUCCESS:
            const environmentList = state.status
                ? [...state.environments, action.response.environments]
                : action.response.environments;
            return {
                status: action.response.status,
                environments: environmentList,
                message: action.response.message,
            };
        case EnvironmentTypes.GETENVIRONMENTS_FAILURE:
            return {
                status: action.response.status,
                message: action.response.message,
            };
        default:
            return state;
    }
};
