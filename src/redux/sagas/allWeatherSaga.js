import {all} from "redux-saga/effects";
import {watchFetchNowWeather} from "./nowInfoSaga";
import {watchFetchNextDaysWeather} from "./nextDaysSaga";

export function* allWeather() {
    yield all([
        watchFetchNowWeather(),
        watchFetchNextDaysWeather()
    ])
}