import {applyMiddleware, createStore} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import {watchFetchWeather} from "./sagas/nextDaysSaga";
import {reducer} from "./reducer";
import {allWeather} from "./sagas/allWeatherSaga";

export let initialState = {
    city: "Пермь",
    nowInfo: {
        time: undefined,
        weather: undefined
    },
    weatherNextDays: [],
    message: undefined
};

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(reducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(allWeather);
