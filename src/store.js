import {applyMiddleware, createStore} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import {watchFetchWeather} from "./utils/getWeather";

let initialState = {
    location: {
        city: "Пермь",
        time: new Date(Date.now()).toLocaleTimeString("ru", {hour: 'numeric', minute: 'numeric'}),
    },
    weather: {
        today: undefined,
        nextDays: []
    },
    error: undefined
};

initialState = {
    location: {
        city: "Пермь",
        time: new Date(Date.now()).toLocaleTimeString("ru", {hour: 'numeric', minute: 'numeric'}),
    },
    weather: {
        today: undefined,
        nextDays: []
    },
    error: undefined
}

// TODO Move to selectors.js
export function getLocation(state) {
    return state.location;
}
export function getWeather(state) {
    return state.weather;
}


// actionTypes.js
export const actionTypes = {
    SET_LOCATION: "SET_LOCATION",
    SET_WEATHER: "SET_WEATHER",
    SET_MESSAGE: "SET_MESSAGE",
    FETCH_DATA: "FETCH_DATA"
};

// deprecated
export const setData = (location, weather) => {
    return {
        type: "SET_DATA",
        payload: {
            location,
            weather
        }
    };
};

export const setError = (error) => {
    return {
        type: "SET_ERROR",
        payload: {
            error
        }
    }
}

export const setLocation = (location) => {
    return {
        type: actionTypes.SET_LOCATION,
        payload: {
            location,
        }
    };
};

export const setWeather = (weather) => {
    return {
        type: actionTypes.SET_WEATHER,
        payload: {
            weather,
        }
    };
};

export const setMessage = (message) => {
    return {
        type: actionTypes.SET_MESSAGE,
        payload: {
            message,
        }
    };
};

export const fetchData = (city) => {
    return {
        type: actionTypes.FETCH_DATA,
        payload: {
            city
        }
    }
}

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case "SET_DATA":
            return {
                ...state,
                location: action.payload.location,
                weather: action.payload.weather,
                error: undefined
            };
            break;
        case "SET_ERROR":
            return {
                ...state,
                location: {
                    city: undefined,
                    time: undefined,
                },
                weather: {
                    today: undefined,
                    nextDays: []
                },
                error: action.payload.error
            };
            break;
        default: return state
    }
};

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(reducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));
store.dispatch(fetchData(store.getState().location.city));
sagaMiddleware.run(watchFetchWeather);
