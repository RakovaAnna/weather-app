import {API_KEY, lang, units} from "./utils/local";

export const api = {
    loadNextDaysWeather: (city) => {
        return fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=${units}&lang=${lang}`)
            .then((data) => data.json())
    },

    loadNowWeather: (city) => {
        return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}&lang=${lang}`)
            .then((data) => data.json())
    }
}