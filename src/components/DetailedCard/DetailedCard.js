import React from "react";
import style from './DetailedCard.module.css';

import * as dayInfo from '../../utils/getDaysInfo';

class DetailedCard extends React.Component {
    render() {
        const {day} = this.props;
        if (day) {
            const {main: baseData} = day;
            const ms = day.dt * 1000;
            const weekdayName = dayInfo.weekdayName(ms);
            const monthDay = dayInfo.monthDay(ms);
            const imgURL = dayInfo.iconWeather(day.weather[0].icon);
            const time = new Date(this.props.time).toLocaleTimeString("ru", {hour: 'numeric', minute: 'numeric'});
            return (
                <div className={style.DetailedCard}>
                    <p className={style.baseData}>Сегодня, {monthDay}</p>
                    <p>{weekdayName}, {time}</p>
                    <div className="row">
                        <div className="col-sm-5 align-self-center">
                            <img src={imgURL} width="200" height="200" alt={day.weather[0].description}/>
                        </div>
                        <div className="col-sm-7 align-self-center">
                            <p className={style.temperature}>{Math.round(baseData.temp)} °C</p>
                            <p className={style.feels}>По ощущениям {Math.round(baseData.feels_like)} °C</p>
                            <p className={style.detailsWeather}>{day.weather[0].description}</p>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className={style.DetailedCard}>
                    <p className={style.baseData}>Сегодня</p>
                </div>
            );
        }

    }
}

export default DetailedCard;