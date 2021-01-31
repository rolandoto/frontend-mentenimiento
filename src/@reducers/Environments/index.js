import { EnvironmentTypes } from "../../@types";

function evaluateEnvironments(state, action) {
    if (action.edit) {
        return state.status
            ? state.environments.map((environmet) => {
                  if (environmet._id === action.updatedEnvironment._id) {
                      return action.updatedEnvironment;
                  }
                  return environmet;
              })
            : action.environments;
    } else {
        if (action.delete) {
            const environments = state.environments.filter((environment) => {
                return environment._id !== action._id;
            });
            return environments;
        } else {
            return state.status
                ? [...state.environments, action.environments]
                : action.environments;
        }
    }
}

export const EnvironmentsAllReducer = (state = {}, action) => {
    switch (action.type) {
        case EnvironmentTypes.GETENVIRONMENTS_REQUEST:
            return {
                loading: true,
            };
        case EnvironmentTypes.GETENVIRONMENTS_SUCCESS:
            const environmentList = evaluateEnvironments(
                state,
                action.response
            );
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
