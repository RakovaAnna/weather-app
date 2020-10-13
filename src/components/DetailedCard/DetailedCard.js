import React from "react";
import style from './DetailedCard.module.css';

import * as dayInfo from '../../utils/getDaysInfo';
import {connect} from "react-redux";
import {getLocation} from "../../store";

class DetailedCard extends React.Component {
    render() {
        const {day, location} = this.props;
        const {city} = location;
        const {main: baseData} = day;
        const ms = day.dt * 1000;

        const weekdayName = dayInfo.weekdayName(ms);
        const monthDay = dayInfo.monthDay(ms);
        const imgURL = day && day.weather && day.weather[0] ? dayInfo.iconWeather(day.weather[0].icon) : 'logo192.png';

        const today = day.weather[0] || {};

        const {temp, feels_like} = baseData || {};

        return (
            <div className={style.DetailedCard}>
                <p className={style.baseData}>Сегодня в городе {city}, {monthDay}</p>
                <p>{weekdayName}, {this.props.time}</p>
                <div className="row">
                    <div className="col-sm-5 align-self-center">
                        <img src={imgURL} width="200" height="200"  alt={today.description}/>
                    </div>
                    <div className="col-sm-7 align-self-center">
                        <p className={style.temperature}>{Math.round(temp)} °C</p>
                        <p className={style.feels}>По ощущениям {Math.round(feels_like)} °C</p>
                        <p className={style.detailsWeather}>{today.description}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect((state) => {
    return {
        location: getLocation(state)
    };
})(DetailedCard)

