import {initialState} from "./store";
import {actionType} from "./actionType";

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.SET_CITY:
            return {
                ...initialState,
                city: action.payload.city,
            };
        case actionType.SET_NOW_INFO:
            return {
                ...state,
                nowInfo: action.payload.nowInfo,
            };
        case actionType.SET_NEXT_DAYS:
            return {
                ...state,
                nextDays: action.payload.nextDays
            };
        case actionType.SET_MESSAGE:
            return {
                ...state,
                message: action.payload.message
            };
        default:
            return state
    }
};