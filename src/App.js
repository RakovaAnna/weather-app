import React from 'react';
import './App.model.css';
import ChooseCityForm from "./components/ChooseCityForm/ChooseCityForm";
import WeatherCard from "./components/WeatherCard/WeatherCard";
import {getWeather} from './utils/getWeather';
import {api} from './api';
import * as daysInfo from "./utils/getDaysInfo";
import {enLayoutKeyboard, ruLayoutKeyboard} from "./utils/autoLayoutKeyboard";

class App extends React.Component {

    state = {
        city: undefined,
        time: undefined,
        today: undefined,
        days: [],
        error: ""
    }

    changedState = (cityForecast) => {
        if (cityForecast !== null) {
            this.setState({
                city: cityForecast.city.name,
                time: Date.now() + new Date().getTimezoneOffset() * 60 * 1000 + cityForecast.city.timezone * 1000,
                today: cityForecast.list.shift(),
                days: cityForecast.list.filter(reading => reading.dt_txt.includes("12:00:00") && !(reading.dt_txt.includes(daysInfo.today()))),
                error: undefined
            })
            return true;
        }
        return false;
    }

    handleCitySelect = (city) => {
        // const dataRu = api.loadWeatherForCity(ruLayoutKeyboard(city))
        //     .then((cityForecast) => {
        //         const okRu = this.changedState(cityForecast);
        //         if (!okRu) {
        //             const dataEn = api.loadWeatherForCity(enLayoutKeyboard(city))
        //                 .then((cityForecast) => {
        //                     const okEn = this.changedState(cityForecast);
        //                     if (!okEn) {
        //                         this.setState({
        //                             city: undefined,
        //                             time: undefined,
        //                             today: undefined,
        //                             days: [],
        //                             error: "Город не найден"
        //                         });
        //                     }
        //                 })
        //         }
        //
        //     });

        const cities = [
            ruLayoutKeyboard(city),
            enLayoutKeyboard(city)
        ];

        api.loadAll(cities).then((cityForecasts) => {
            console.log(cityForecasts);
            // if (cityForecasts !== null) {
            //     this.setState({
            //         city: cityForecasts.city.name,
            //         time: Date.now() + new Date().getTimezoneOffset() * 60 * 1000 + cityForecasts.city.timezone * 1000,
            //         today: cityForecasts.list.shift(),
            //         days: cityForecasts.list.filter(reading => reading.dt_txt.includes("12:00:00") && !(reading.dt_txt.includes(daysInfo.today()))),
            //         error: undefined
            //     })
            // } else {
            //     this.setState({
            //         city: undefined,
            //         time: undefined,
            //         today: undefined,
            //         days: [],
            //         error: "Город не найден"
            //     });
            // }
        });
    }

    render() {
        const {state: {city, time, today, days, error}} = this;
        return (
            <div className="main">
                <h1 className="info">Прогноз погоды</h1>
                <ChooseCityForm
                    onCitySelect={this.handleCitySelect}
                />
                <WeatherCard city={city} time={time} today={today} days={days} error={error}/>
            </div>
        );
    }
}

export default App;
