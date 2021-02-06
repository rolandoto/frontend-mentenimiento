import { SparePartsTypes } from "../../@types";

function evalueChangeSpareParts(state, action) {
    if (action.edit) {
        return state.status
            ? state.spareParts.map((sparePart) => {
                  if (sparePart._id === action.sparePart._id) {
                      return action.sparePart;
                  }
                  return sparePart;
              })
            : action.sparePart;
    } else {
        if (action.delete) {
            const spareParts = state.spareParts.filter((sparePart) => {
                return sparePart._id !== action._id;
            });
            return spareParts;
        } else {
            return state.status
                ? [action.sparePart, ...state.spareParts]
                : action.spareParts;
        }
    }
}

export const SparePartsAllReducer = (state = {}, action) => {
    switch (action.type) {
        case SparePartsTypes.GETSPAREPARTS_REQUEST:
            return {
                loading: true,
            };

        case SparePartsTypes.GETSPAREPARTS_SUCCESS:
            const sparePartList = evalueChangeSpareParts(
                state,
                action.response
            );

            return {
                status: action.response.status,
                spareParts: sparePartList,
                message: action.response.message,
            };

        case SparePartsTypes.GETSPAREPARTS_FAILURE:
            return {
                status: action.response.status,
                message: action.response.message,
            };

        default:
            return state;
    }
};
