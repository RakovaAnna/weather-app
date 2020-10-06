import {createStore} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension';

const initialState = {
    location: "Пермь",
    time: Date.now(),
    weather: {
        today: undefined,
        nextDays: []
    },
    error: undefined
};

export const setLocation = (location) => {
    return {
        type: "SET_LOCATION",
        payload: {
            location
        }
    };
};

const reducer = (state=initialState, action) => {
    if (action.type === "SET_LOCATION") {
        const newLocation = action.payload.location;
        return {
            ...state,
            location: newLocation
        };
    }
    return state;
};


export const store = createStore(reducer, composeWithDevTools(

));
window.store = store;