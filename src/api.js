import {API_KEY, lang, units} from "./utils/local";

export const api = {
  loadWeatherForCity: (city) => {
    // return fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=${units}&lang=${lang}`).then((data) => data.json())

    return fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=${units}&lang=${lang}`).then((data) => data.json())
  }
}

window.api = api;
