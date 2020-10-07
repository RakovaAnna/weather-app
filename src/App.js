import React from 'react';
import './App.model.css';
import ChooseCityForm from "./components/ChooseCityForm/ChooseCityForm";
import WeatherCard from "./components/WeatherCard/WeatherCard";
import {getWeather} from './utils/getWeather';
import {api} from './api';

class App extends React.Component {

    state = {
        city: undefined,
        time: undefined,
        today: undefined,
        days: [],
        error: ""
    }

    handleCitySelect = (city) => {
      api.loadWeatherForCity(city)
        .then((cityForecast) => {
          const {
            city,
            time,
            today,
            days,
            error
          } = cityForecast;

          this.setState({
            city,
            time,
            today,
            days,
            error
          });
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
                <WeatherCard city ={city} time={time} today={today} days={days} error={error}/>
            </div>
        );
    }
}

export default App;
