import {initialState} from "./store";
import {actionType} from "./actionType";

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.SET_CITY:
            return {
                ...initialState,
                city: action.payload.city,
            };
        case actionType.SET_NOW:
            return {
                ...state,
                now: action.payload.now,
            };
        case actionType.SET_NEXT_DAYS:
            return {
                ...state,
                nextDays: action.payload.nextDays
            };
        default:
            return state
    }
};