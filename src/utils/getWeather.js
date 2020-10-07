import * as daysInfo from "./getDaysInfo";
import React from "react";
import {ruLayoutKeyboard, enLayoutKeyboard} from "./autoLayoutKeyboard";
import {API_KEY, units, lang} from "./local";

const getApiWeather = async (city) => {
    try{
        const api_url_ru = await
            fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=${units}&lang=${lang}`);
        const data = await api_url_ru.json();
        return data;
    } catch (err) {
        return null;
    }
}

export const getWeather = async (city, state) => {
    const cityRu = ruLayoutKeyboard(city);
    const cityEn = enLayoutKeyboard(city);
    const dataRu = await getApiWeather(cityRu);
    const dataEn = await getApiWeather(cityEn);
    const data = dataRu ? dataRu : dataEn;

    if (!data) {
        return {
            city: undefined,
            time: undefined,
            weather: {
                today: undefined,
                nextDays: []
            },
            error: "Город " + city + " не найден"
        };
    }

    const dailyData = data.list.filter(reading => reading.dt_txt.includes("12:00:00") && !(reading.dt_txt.includes(daysInfo.today())));
    const weatherNow = data.list.shift();
    const timestamp = new Date().getUTCDate() + new Date(data.city.timezone);
console.log(timestamp);
    return {
        time: timestamp,
        city: data.city.name,
        weather: {
            today: weatherNow,
            days: dailyData,
        },
        error: undefined
    };
}