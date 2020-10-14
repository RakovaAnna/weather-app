import {applyMiddleware, createStore} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import {watchFetchWeather} from "./getWeather";
import {reducer} from "./reducer";

export let initialState = {
    city: "Пермь",
    now: {
        time: undefined,
        weather: undefined
    },
    weatherNextDays: [],
    message: undefined
};

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(reducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(watchFetchWeather);
