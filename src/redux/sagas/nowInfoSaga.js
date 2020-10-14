import {all, call, put, takeEvery} from "@redux-saga/core/effects";
import {api} from "../../api";
import {setCity, setMessage, setNowInfo} from "../actionsCreators";
import {ruLayoutKeyboard} from "../../utils/autoLayoutKeyboard";
import {mesCityNotFound} from "../../utils/local";
import {watchFetchNextDaysWeather} from "./nextDaysSaga";
import {actionType} from "../actionType";

const newState = (data) => {
    if (data.cod !== '404') {
        const time = Date.now() + new Date().getTimezoneOffset() * 60 * 1000 + data.timezone * 1000;
        return {
            nowInfo: {
                time,
                weather: data
            }
        }
    }
    return null;
}

export function* fetchNowWeatherAsync({payload}) {
    const {city} = payload;
    try {
        const data = yield call(api.loadNowWeather, city);
        const info = newState(data);
        if (info !== null) {
            yield put(setNowInfo(info.nowInfo));
        } else {
            const cityRu = ruLayoutKeyboard(city);
            const dataRu = yield call(api.loadNowWeather, cityRu);
            const infoRu = newState(dataRu);
            if (infoRu) {
                yield put(setCity(cityRu));
                yield put(setNowInfo(infoRu.nowInfo));
            } else {
                yield put(setMessage(mesCityNotFound(city)));
            }
        }
    } catch {
        yield put(setMessage(mesCityNotFound(city)));
    }
}

export function* watchFetchNowWeather() {
    yield takeEvery(actionType.SET_CITY, fetchNowWeatherAsync);
    yield takeEvery(actionType.FETCH_DATA_NOW, fetchNowWeatherAsync);
}