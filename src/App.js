import React from 'react';
import './App.model.css';
import ChooseCityForm from "./components/ChooseCityForm/ChooseCityForm";
import WeatherCard from "./components/WeatherCard/WeatherCard";
import {getWeather} from './utils/getWeather';

class App extends React.Component {

    state = {
        city: undefined,
        time: undefined,
        today: undefined,
        days: [],
        error: ""
    }

    getWeather = async (event) => {
        event.preventDefault();
        const city = event.target.elements.city.value;
        await getWeather(city, this);
    }

    render() {
        const {state} = this;
        return (
            <div className="main">
                <h1 className="info">Прогноз погоды</h1>
                <ChooseCityForm weather={this.getWeather}/>
                <WeatherCard city ={state.city} time={state.time} today={state.today} days={state.days} error={state.error}/>
            </div>
        );
    }
}

export default App;
