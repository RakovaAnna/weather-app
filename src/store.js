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

export const setData = (location, time, weather, error) => {
    return {
        type: "SET_DATA",
        payload: {
            location,
            time,
            weather,
            error
        }
    };
};

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case "SET_LOCATION":
            const newLocation = action.payload.location;
            return {
                ...state,
                location: newLocation
            };
            break;
        case "SET_DATA":
            return {
                location: action.payload.location,
                time: action.payload.time,
                weather: action.payload.weather,
                error: action.payload.error
            };
        default: return state
    }
};


export const store = createStore(reducer, composeWithDevTools(

));
window.store = store;