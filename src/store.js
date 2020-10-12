import {applyMiddleware, createStore} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import {watchFetchWeather} from "./utils/getWeather";

const initialState = {
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

export const fetchData = (city) => {
    return {
        type: "FETCH_DATA",
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
sagaMiddleware.run(watchFetchWeather);
