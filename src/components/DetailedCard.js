import React from "react";
import './Card.css';
import s from './DetailedCard.module.css';

import * as func from '../helpers';

class DetailedCard extends React.Component {
    render() {
        const ms = this.props.day.dt * 1000;
        const weekdayName = func.weekdayName(ms);
        const monthDay = func.monthDay(ms);
        const {day} = this.props;
        const {main: baseData} = day;
        const timeG = new Date(this.props.time).toLocaleTimeString("ru", {hour: 'numeric', minute: 'numeric'});
        const imgURL = func.iconWeather(day.weather[0].icon, "4x");

        return (
            <div className={s.DetailedCard}>
                <p className={s.baseData}>Сегодня, {monthDay}</p>
                <p>{weekdayName}, {timeG}</p>
                <div className="row">
                    <div className="col-sm-4 align-self-center">
                        <img src={imgURL}/>
                    </div>
                    <div className="col-sm-7 align-self-center">
                        <p className="temperature">{Math.round(baseData.temp)} °C</p>
                        <p className="feels">По ощущениям {Math.round(baseData.feels_like)} °C</p>
                        <p className="details-weather">{day.weather[0].description}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default DetailedCard;