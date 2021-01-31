import { MachinesTypes } from "../../@types";

function evalueChangeMachineStatus(state, action) {
    if (action.edit) {
        return state.status
            ? state.machines.map((machine) => {
                  if (machine._id === action.updatedMachine._id) {
                      return action.updatedMachine;
                  }
                  return machine;
              })
            : action.machines;
    } else {
        if (action.delete) {
            const machines = state.machines.filter((machine) => {
                return machine._id !== action._id;
            });
            return machines;
        } else {
            if (action.completeMaitenance) {
                return state.status
                    ? state.machines.map((machine) => {
                          if (machine._id === action.maintenance.machine._id) {
                              machine.maintenances = machine.maintenances.map(
                                  (maintenance) => {
                                      if (
                                          maintenance._id ===
                                          action.maintenance._id
                                      ) {
                                          return action.maintenance;
                                      }

                                      return maintenance;
                                  }
                              );

                              return machine;
                          }

                          return machine;
                      })
                    : action.machines;
            } else {
                return state.status
                    ? [...state.machines, action.machines]
                    : action.machines;
            }
        }
    }
}

export const MachineAllReducer = (state = {}, action) => {
    switch (action.type) {
        case MachinesTypes.GETMACHINES_REQUEST:
            return {
                loading: true,
            };

        case MachinesTypes.GETMACHINES_SUCCESS:
            const machineList = evalueChangeMachineStatus(
                state,
                action.response
            );

            return {
                status: action.response.status,
                machines: machineList,
                message: action.response.message,
            };

        case MachinesTypes.GETMACHINES_FAILURE:
            return {
                status: action.response.status,
                message: action.response.message,
            };

        default:
            return state;
    }
};

export const MachineOneReducer = (state = {}, action) => {
    switch (action.type) {
        case MachinesTypes.GETMACHINE_REQUEST:
            return {
                loading: true,
            };
        case MachinesTypes.GETMACHINE_SUCCESS:
            return {
                state: action.response.state,
                status: action.response.status,
                machine: action.response.machine,
                message: action.response.message,
            };

        case MachinesTypes.GETMACHINE_FAILURE:
            return {
                status: action.response.status,
                message: action.response.message,
            };
        default:
            return state;
    }
};
