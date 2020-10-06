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
        console.log(city);
        console.log(API_key);
        const api_url = await
            fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_key}&units=${units}&lang=${lang}`);
        console.log(api_url);
        const data = await api_url.json();
        if (data.cod === '200') {
            const dailyData = data.list.filter(reading => reading.dt_txt.includes("12:00:00")&&!(reading.dt_txt.includes(func.today())));
            const weatherNow = data.list.shift();
            var timestamp = new Date().getTime() + data.city.timezone;
            console.log(weatherNow);
            this.setState({
                time: timestamp,
                city: city,
                today: weatherNow,
                days: dailyData,
                error: undefined
            });
        } else {
            this.setState({
                time: undefined,
                city: undefined,
                today: undefined,
                days: [],
                error: "Город не найден"
            });
        }
    }

    formatCards = () => {
        return this.state.days.map((day, index) => <MiniCardDay day={day} key={index}/>)
    }

    render() {
        const {location} = this.props;
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

