import React from 'react';
import './App.css';
import FormChooseCity from "./components/FormChooseCity";
import MiniCardDay from "./components/MiniCardDay";
import DetailedCard from "./components/DetailedCard";
import * as func from './helpers';
import {connect} from "react-redux";
import {setLocation} from "./store";

const API_key = process.env.REACT_APP_WEATHER_API_KEY;
const units = "metric";
const lang = "ru"

import './App.model.css';
import ChooseCityForm from "./components/ChooseCityForm/ChooseCityForm";
import WeatherCard from "./components/WeatherCard/WeatherCard";
import {getWeather} from './utils/getWeather';

class AppComponent extends React.Component {

    state = {
        city: undefined,
        today: undefined,
        time: undefined,
        days: [],
        error: undefined
    }

    getWeather = async (event) => {
        event.preventDefault();
        const city = event.target.elements.city.value;
        await getWeather(city, this);
    }

    render() {
        const {location} = this.props;
        const {state} = this;
        return (
            <div className="main">
                <h1 className="info">ПРОГНОЗ ПОГОДЫ {location}</h1>
                <FormChooseCity weather={this.getWeather}/>
                {this.state.city &&
                <div className="container-fluid">
                    <div className="row justify-content-center ">
                        <div className="col-sm-4">
                            <DetailedCard day={this.state.today} city={func.ucFirst(this.state.city)} time={this.state.time}/>
                        </div>
                        <div className="col-sm-8">
                            <div className="row align-items-center">
                                {this.formatCards()}
                            </div>
                        </div>
                    </div>
                </div>
                }
                <button onClick={()=>this.props.onSetLocation(Date.now())}>{location}</button>
                <p className="error">{this.state.error}</p>
                <h1 className="info">Прогноз погоды</h1>
                <ChooseCityForm weather={this.getWeather}/>
                <WeatherCard city ={state.city} time={state.time} today={state.today} days={state.days} error={state.error}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        location: state.location
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSetLocation: (location) => dispatch(setLocation(location))
    }
}

export const App = connect(mapStateToProps, mapDispatchToProps)(AppComponent);

