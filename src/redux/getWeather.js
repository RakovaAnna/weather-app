import React from "react";
import {ruLayoutKeyboard, enLayoutKeyboard} from "../utils/autoLayoutKeyboard";
import {call, put, takeEvery} from "redux-saga/effects";
import {setCity, setMessage, setNow, setNextDays} from "./actionsCreators";
import * as daysInfo from "../utils/getDaysInfo";
import {api} from '../api';

const newState = (data) => {
    if (data.cod === '200') {
        const time = Date.now() + new Date().getTimezoneOffset() * 60 * 1000 + data.city.timezone * 1000;
        const weather = data.list.shift();
        const days = data.list.filter(reading => reading.dt_txt.includes("12:00:00") && !(reading.dt_txt.includes(daysInfo.today())));
        return {
            now: {
                time,
                weather
            },
            days
        }
    }
    return null;
}

export function* fetchWeatherAsync({payload}) {
    const {city} = payload;
    try {
        const data = yield call(api.loadWeatherForCity, city);
        const info = newState(data);
        if (info !== null) {
            yield put(setNow(info.now));
        } else {
            const cityRu = ruLayoutKeyboard(city);
            const dataRu = yield call(api.loadWeatherForCity, cityRu);
            const infoRu = newState(dataRu);
            if (infoRu) {
                yield put(setNow(infoRu.now));
            } else {
                yield put(setMessage("Город " + city + " не найден"));
            }
        }
    } catch {
        yield put(setMessage("Город " + city + " не найден"));
    }
}

export function* watchFetchWeather() {
    yield takeEvery('FETCH_DATA', fetchWeatherAsync);
}