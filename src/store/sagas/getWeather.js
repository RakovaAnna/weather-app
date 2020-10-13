import React from "react";
import {ruLayoutKeyboard, enLayoutKeyboard} from "../../utils/autoLayoutKeyboard";
import {API_KEY, units, lang} from "../../utils/local";
import {call, put, takeEvery} from "redux-saga/effects";
import {actionTypes, setData, setError, setMessage} from "../../store";
import * as daysInfo from "../../utils/getDaysInfo";


export function* fetchWeatherAsync({payload}) {
    try {
        const {city} = payload;
        const data = yield call(getApiWeather, city);
        if (data.cod === '200') {
            const time = new Date(Date.now() + new Date().getTimezoneOffset() * 60000 + data.city.timezone * 1000)
                .toLocaleTimeString("ru", {hour: 'numeric', minute: 'numeric'});
            const dailyData = data.list.filter(reading => reading.dt_txt.includes("12:00:00") && !(reading.dt_txt.includes(daysInfo.today())));
            const weatherNow = data.list.shift();

            yield put(setData({city, time},{today: weatherNow, nextDays: dailyData}));
        } else {
            // yield put(setError("Город " + payload.city + " не найден"));
            const reverted = payload.city; // TODO Modify payload.city
            yield put(setMessage('Возможно вы искали ${reverted}'));
            const data = yield call(getApiWeather, city);
            // ...
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

export function* watchFetchWeather() {
    yield takeEvery(actionTypes.FETCH_DATA, fetchWeatherAsync);
}
