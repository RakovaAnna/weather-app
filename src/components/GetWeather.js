import * as func from "../helpers";
import React from "react";
import * as autoLayout from "./AutoLayoutKeyboard";

export const getApiWeather = async (city, API_KEY, units, lang, state) => {
    const cityRu = autoLayout.ruLayoutKeyboard(city);
    const api_url_ru = await
        fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${cityRu}&appid=${API_KEY}&units=${units}&lang=${lang}`);
    const dataRu = await api_url_ru.json();

    const cityEn = autoLayout.enLayoutKeyboard(city);
    const api_url_en = await
        fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${cityEn}&appid=${API_KEY}&units=${units}&lang=${lang}`);
    const dataEn = await api_url_en.json();

    if (dataRu.cod !== '200' && dataEn.cod !== '200') {
        state.setState({
            time: undefined,
            city: undefined,
            today: undefined,
            days: [],
            error: "Город " + city + " не найден"
        });
        return;
    }

    const data = dataRu.cod === '200' ? dataRu : dataEn;
    const dailyData = data.list.filter(reading => reading.dt_txt.includes("12:00:00") && !(reading.dt_txt.includes(func.today())));
    const weatherNow = data.list.shift();
    const timestamp = new Date().getTime() + data.city.timezone;
    state.setState({
        time: timestamp,
        city: data.city.name,
        today: weatherNow,
        days: dailyData,
        error: undefined
    });
}