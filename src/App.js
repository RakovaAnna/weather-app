import React from 'react';
import './App.model.css';
import ChooseCityForm from "./components/ChooseCityForm/ChooseCityForm";
import WeatherCard from "./components/WeatherCard/WeatherCard";
import {getWeather} from './utils/getWeather';
import {connect} from "react-redux";
import {setLocation, setData} from "./store";


class AppComponent extends React.Component {

    // state = {
    //     city: undefined,
    //     today: undefined,
    //     time: undefined,
    //     days: [],
    //     error: undefined
    // }

    getWeather = async (event) => {
        event.preventDefault();
        const city = event.target.elements.city.value;
        const data = await getWeather(city);
        this.props.onSetData(data.city, data.time, data.weather, data.error);
    }

    render() {
        const {props} = this;
        return (
            <div className="main">
                <h1 className="info">Прогноз погоды</h1>
                <ChooseCityForm weather={this.getWeather}/>
                <WeatherCard city ={props.city} time={props.time} today={props.weather.today} days={props.weather.nextDays} error={props.error}/>
                {/*<button onClick={()=>this.props.onSetLocation(Date.now())}>{location}</button>*/}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        location: state.location,
        time: state.time,
        weather: state.weather,
        error: state.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSetData: (location, time, weather, error) => dispatch(setData(location, time, weather, error))
    }
}

export const App = connect(mapStateToProps, mapDispatchToProps)(AppComponent);

