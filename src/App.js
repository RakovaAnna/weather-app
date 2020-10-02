import React from 'react';
import './App.css';
import FormChooseCity from "./components/FormChooseCity";
import MiniCardDay from "./components/MiniCardDay";
import DetailedCard from "./components/DetailedCard";
import {getApiWeather} from './components/GetWeather';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const units = "metric";
const lang = "ru"


class App extends React.Component {

    state = {
        time: undefined,
        city: undefined,
        today: undefined,
        days: [],
        error: ""
    }

    getWeather = async (event) => {
        event.preventDefault();
        const city = event.target.elements.city.value;
        getApiWeather(city, API_KEY, units, lang, this);
    }

    formatCards = () => {
        return this.state.days.map((day, index) => <MiniCardDay day={day} key={index}/>)
    }

    render() {
        return (
            <div className="main">
                <h1 className="info">Прогноз погоды</h1>
                <FormChooseCity weather={this.getWeather}/>
                <div className="container-fluid">
                    {this.state.city &&
                    <div>
                        <h2 className="card-title">{this.state.city}</h2>
                        <div className="row justify-content-center ">
                            <div className="col-sm-4">
                                <DetailedCard day={this.state.today} city={this.state.city} time={this.state.time}/>
                            </div>
                            <div className="col-sm-8">
                                <div className="row align-items-center">
                                    {this.formatCards()}
                                </div>
                            </div>
                        </div>
                    </div>
                    }
                    <p className="error">{this.state.error}</p>
                </div>
            </div>
        );
    }
}

export default App;
