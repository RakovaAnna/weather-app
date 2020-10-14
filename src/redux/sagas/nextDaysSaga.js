import React from "react";
import {ruLayoutKeyboard, enLayoutKeyboard} from "../../utils/autoLayoutKeyboard";
import {call, put, takeEvery} from "redux-saga/effects";
import {setCity, setMessage, setNextDays} from "../actionsCreators";
import * as daysInfo from "../../utils/getDaysInfo";
import {api} from '../../api';
import {mesCityNotFound} from "../../utils/local";
import {actionType} from "../actionType";

const newState = (data) => {
    if (data.cod === '200') {
        return data.list.filter(reading => reading.dt_txt.includes("12:00:00") && !(reading.dt_txt.includes(daysInfo.today())));
    }
    return null;
}

export function* fetchWeatherNextDaysAsync({payload}) {
    const {city} = payload;
    try {
        const data = yield call(api.loadNextDaysWeather, city);
        const nextDays = newState(data);
        if (nextDays !== null) {
            yield put(setNextDays(nextDays));
        } else {
            const cityRu = ruLayoutKeyboard(city);
            const dataRu = yield call(api.loadNextDaysWeather, cityRu);
            const daysRU = newState(dataRu);
            if (daysRU) {
                yield put(setCity(cityRu));
                yield put(setNextDays(nextDays));
            } else {
                yield put(setMessage(mesCityNotFound(city)));
            }
        }
    } catch {
        yield put(setMessage(mesCityNotFound(city)));
    }
}

export function* watchFetchNextDaysWeather() {
    yield takeEvery(actionType.FETCH_DATA_NEXT_DAYS, fetchWeatherNextDaysAsync);
}