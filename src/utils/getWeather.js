import * as daysInfo from "./getDaysInfo";
import React from "react";
import {ruLayoutKeyboard, enLayoutKeyboard} from "./autoLayoutKeyboard";
import {API_KEY, units, lang} from "./local";

const getApiWeather = async (city) => {
    const api_url_ru = await
        fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=${units}&lang=${lang}`);
    return await api_url_ru.json();
}

export const getWeather = async (city, state) => {
    const cityRu = ruLayoutKeyboard(city);
    const dataRu = await getApiWeather(cityRu);
    const cityEn = enLayoutKeyboard(city);
    const dataEn = await getApiWeather(cityEn);

    console.log(dataEn);
    console.log(dataRu);

    const data = dataRu.cod === '200' ? dataRu : dataEn;

    if (data.cod !== '200') {
        state.setState({
            time: undefined,
            city: undefined,
            today: undefined,
            days: [],
            error: "Город " + city + " не найден"
        });
        return;
    }

    const dailyData = data.list.filter(reading => reading.dt_txt.includes("12:00:00") && !(reading.dt_txt.includes(daysInfo.today())));
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