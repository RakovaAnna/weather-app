import React from 'react';
import './App.model.css';
import ChooseCityForm from "./components/ChooseCityForm/ChooseCityForm";
import WeatherCard from "./components/WeatherCard/WeatherCard";
import {connect} from "react-redux";
import {setData, setError, fetchData} from "./store";
import {api} from './api';
import * as daysInfo from "./utils/getDaysInfo";
import {enLayoutKeyboard, ruLayoutKeyboard} from "./utils/autoLayoutKeyboard";

class AppComponent extends React.Component {

    getWeather = (event) => {
        event.preventDefault();
        const city = event.target.elements.city.value;
        this.props.onFetchData(city);
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
        api.loadWeatherForCity(ruLayoutKeyboard(city))
            .then((cityForecast) => {
                const okRu = this.changedState(cityForecast);
                if (!okRu) {
                    api.loadWeatherForCity(enLayoutKeyboard(city))
                        .then((cityForecast) => {
                            const okEn = this.changedState(cityForecast);
                            if (!okEn) {
                                this.setState({
                                    city: undefined,
                                    time: undefined,
                                    today: undefined,
                                    days: [],
                                    error: "Город " + city + " не найден"
                                });
                            }
                        })
                }

            });
    }

    render() {
        const {props} = this;
        const {location, weather} = props;
        const {state: {city, time, today, days, error}} = this;
        return (
            <div className="main">
                <h1 className="info">Прогноз погоды</h1>
                <ChooseCityForm
                    onCitySelect={this.handleCitySelect}
                />
                <WeatherCard city={city} time={time} today={today} days={days} error={error}/>
                <h1 className="info">Прогноз погоды {location.city}</h1>
                <ChooseCityForm weather={this.getWeather}/>
                <WeatherCard city={location.city} time={location.time} today={weather.today} days={weather.nextDays}
                             error={props.error}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        location: {
            city: state.city,
            time: state.time,
        },
        weather: {
            today: state.today,
            nextDays: state.nextDays,
        },
        error: state.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSetData: (location, weather) => dispatch(setData(location, weather)),
        onSetError: (error) => dispatch(setError(error)),
        onFetchData: (city) => dispatch(fetchData(city))
    }
}

export const App = connect(mapStateToProps, mapDispatchToProps)(AppComponent);

