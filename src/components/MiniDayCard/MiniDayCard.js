import React from "react";
import * as func from '../../utils/getDaysInfo';
import style from './MiniDayCard.module.css';

class MiniDayCard extends React.Component {
    render() {
        const {day} = this.props;
        const ms = day.dt * 1000;
        const weekdayName = func.weekdayName(ms);
        const monthDay = func.monthDay(ms);
        const imgURL = func.iconWeather(day.weather[0].icon);

        return (
            <div className="col-sm">
                <div className={style.dayWeather}>
                    <h4>{weekdayName},</h4>
                    <h5>{monthDay}</h5>
                    <img src={imgURL} width="150" height="150"  alt={day.weather[0].description}/>
                    <h2>{Math.round(day.main.temp)} °C</h2>
                    <div>
                        <p className="card-text">{day.weather[0].description}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default MiniDayCard;