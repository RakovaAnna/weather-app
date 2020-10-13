import React from 'react';
import './App.model.css';
import ChooseCityForm from "./components/ChooseCityForm/ChooseCityForm";
import WeatherCard from "./components/WeatherCard/WeatherCard";
import {connect} from "react-redux";
import {setData, setError, fetchData, getLocation, getWeather} from "./store";

class AppComponent extends React.Component {
    componentDidMount() {
        const {location: {city}, onFetchData} = this.props;
        onFetchData(city);
    }
    getWeather = (event) => {
        event.preventDefault();
        const city = event.target.elements.city.value;
        this.props.onFetchData(city);
    }

    render() {
        const {props} = this;
        const {location, weather} = props;
        return (
            <div className="main">
                <h1 className="info">Прогноз погоды {location.city}</h1>
                <ChooseCityForm weather={this.getWeather}/>
                <WeatherCard city={location.city}
                             time={location.time}
                             today={weather.today || {weather: []}}
                             days={weather.nextDays}
                             error={props.error}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const location = getLocation(state);
    const weather = getWeather(state);
    return {
        location,
        weather,
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

