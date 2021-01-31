import { MaintenanceTypes } from "../../@types";

function evalueChangeMaitenanceTypeStatus(state, action, prefix) {
    if (action.edit) {
        return state.status
            ? state[prefix].map((item) => {
                  if (item._id === action[prefix]._id) {
                      return action[prefix];
                  }
                  return item;
              })
            : action[prefix];
    } else {
        if (action.delete) {
            const items = state[prefix].filter((item) => {
                return item._id !== action._id;
            });
            return items;
        } else {
            return state.status
                ? [action[prefix], ...state[prefix]]
                : action[prefix];
        }
    }
}

export const MaitenanceTypesReducer = (state = {}, action) => {
    switch (action.type) {
        case MaintenanceTypes.GETMAITENANCETYPES_REQUEST:
            return {
                loading: true,
            };

        case MaintenanceTypes.GETMAITENANCETYPES_SUCCESS:
            const maitenanceTypesList = evalueChangeMaitenanceTypeStatus(
                state,
                action.response,
                "maintenanceTypes"
            );

            return {
                status: action.response.status,
                maintenanceTypes: maitenanceTypesList,
                message: action.response.message,
            };

        case MaintenanceTypes.GETMAITENANCETYPES_FAILURE:
            return {
                status: action.response.status,
                message: action.response.message,
            };
        default:
            return state;
    }
};

export const MaitenancesAllReducer = (state = {}, action) => {
    switch (action.type) {
        case MaintenanceTypes.GETMAITENANCES_REQUEST:
            return {
                loading: true,
            };

        case MaintenanceTypes.GETMAITENANCES_SUCCESS:
            const maitenanceList = evalueChangeMaitenanceTypeStatus(
                state,
                action.response,
                "maintenances"
            );

            return {
                status: action.response.status,
                maintenances: maitenanceList,
                message: action.response.message,
            };

        case MaintenanceTypes.GETMAITENANCES_FAILURE:
            return {
                status: action.response.status,
                message: action.response.message,
            };
        default:
            return state;
    }
};
