import React from "react";
import {ruLayoutKeyboard, enLayoutKeyboard} from "./autoLayoutKeyboard";
import {API_KEY, units, lang} from "./local";
import {call, put, takeEvery} from "redux-saga/effects";
import {setData, setError} from "../store";
import * as daysInfo from "./getDaysInfo";


export function* watchFetchWeather() {
    yield takeEvery('FETCH_DATA', fetchWeatherAsync);
}

export function* fetchWeatherAsync({payload}) {
    try {
        const data = yield call(getApiWeather, payload.city);
        if (data.cod === '200') {
            const timestamp = new Date(Date.now() + new Date().getTimezoneOffset() * 60000 + data.city.timezone * 1000)
                .toLocaleTimeString("ru", {hour: 'numeric', minute: 'numeric'});
            const dailyData = data.list.filter(reading => reading.dt_txt.includes("12:00:00") && !(reading.dt_txt.includes(daysInfo.today())));
            const weatherNow = data.list.shift();
            yield put(setData({city: payload.city, time: timestamp},
                {today: weatherNow, nextDays: dailyData}));
        } else {
            yield put(setError("Город " + payload.city + " не найден"));
        }
    } catch {
        yield put(setError("Город не найден"));
    }
}

const getApiWeather = async (city) => {
    return fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=${units}&lang=${lang}`)
        .then(res => res.json());
    //
    // const apiUrlRu = await
    //     fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=${units}&lang=${lang}`);
    // if (apiUrlRu.ok) {
    //     return await apiUrlRu.json();
    // }
    // return null;
}

// export const getWeatherData = async (city) => {
//     const data = await getApiWeather(city);
//     if (data) {
//         return data;
//     }
//     const dataRu = await getApiWeather(ruLayoutKeyboard(city));
//     if (dataRu) {
//         return dataRu;
//     }
//     const dataEn = await getApiWeather(enLayoutKeyboard(city));
//     return dataEn ? dataEn : null;
// }