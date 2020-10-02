import React from "react";
import './Card.css';
import * as func from '../helpers';

class DetailedCard extends React.Component {
    render() {
        const ms = this.props.day.dt * 1000;
        const weekday = func.weekdayName(ms);
        const day = func.monthDay(ms);
        const timeG = new Date(this.props.time).toLocaleTimeString("ru", {hour: 'numeric', minute: 'numeric'});
        const imgURL = func.iconWeather(this.props.day.weather[0].icon, "4x");

        return (
            <div>
                <h3 className="card-title">{weekday}, {timeG}</h3>
                <p className="date">{day}</p>
                <h2 className="card-title">{this.props.city}</h2>
                <div className="row">
                    <div className="col-sm-4 align-self-center">
                        <img src={imgURL}/>
                    </div>
                    <div className="col-sm-7 align-self-center">
                        <p className="temperature">{Math.round(this.props.day.main.temp)} °C</p>
                        <p className="feels">По ощущениям {Math.round(this.props.day.main.feels_like)} °C</p>
                        <p className="details-weather">{func.ucFirst(this.props.day.weather[0].description)}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default DetailedCard;