import { MachinesTypeTypes } from "../../@types";

function evalueChangeMachineTypeStatus(state, action) {
    if (action.edit) {
        return state.status
            ? state.machineTypes.map((machineType) => {
                  if (machineType._id === action.updatedMachineType._id) {
                      return action.updatedMachineType;
                  }
                  return machineType;
              })
            : action.machineTypes;
    } else {
        if (action.delete) {
            const machineTypes = state.machineTypes.filter((machineType) => {
                return machineType._id !== action._id;
            });
            return machineTypes;
        } else {
            return state.status
                ? [action.machineTypes, ...state.machineTypes]
                : action.machineTypes;
        }
    }
}

export const MachineTypesReducer = (state = {}, action) => {
    switch (action.type) {
        case MachinesTypeTypes.GETMACHINETYPES_REQUEST:
            return {
                loading: true,
            };

        case MachinesTypeTypes.GETMACHINETYPES_SUCCESS:
            const machineTypeList = evalueChangeMachineTypeStatus(
                state,
                action.response
            );

            return {
                status: action.response.status,
                machineTypes: machineTypeList,
                message: action.response.message,
            };

        case MachinesTypeTypes.GETMACHINETYPES_FAILURE:
            return {
                status: action.response.status,
                message: action.response.message,
            };

        default:
            return state;
    }
};
