import React from "react";
import * as func from '../helpers';

class MiniCardDay extends React.Component {
    render() {
        const ms = this.props.day.dt * 1000;
        const weekday = func.weekdayName(ms);
        const date = func.monthDay(ms);
        const imgURL = func.iconWeather(this.props.day.weather[0].icon, "2x");

        return (
            <div className="col-sm">
                <div className="card-weather">
                    <h4 className="card-title">{weekday},</h4>
                    <h5 className="card-title">{date}</h5>
                    <img src={imgURL}/>
                    <h2>{Math.round(this.props.day.main.temp)} °C</h2>
                    <div className="card-body">
                        <p className="card-text">{this.props.day.weather[0].description}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default MiniCardDay;