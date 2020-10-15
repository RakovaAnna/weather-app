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
                    <p className={style.baseData}>{weekdayName}, {monthDay} {time}</p>
                    <div className={`row align-items-center ${style.weatherBase}`}>
                        <div className="col-sm-6 align-self-center">
                            <p className={style.temperature}>{Math.round(baseData.temp)}°</p>
                            <p className={style.detailsWeather}>По ощущениям: {Math.round(baseData.feels_like)} °C</p>
                        </div>
                        <div className="col-sm-6 align-self-center">
                            <img src={imgURL} width="200" height="200" alt={day.weather[0].description}/>
                            <p className={style.detailsWeather}>{day.weather[0].description}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12 align-self-center">
                            <table className={style.tableWeather}>
                                <tbody>
                                <tr className={style.trWeather}>
                                    <td><p className={style.thTitle}>Макс/мин температура</p></td>
                                    <td><p className={style.thDetail}>{Math.round(baseData.temp_max)}° / {Math.round(baseData.temp_min)}°</p></td>
                                    <td><p className={style.thTitle}>Влажность</p></td>
                                    <td><p className={style.thDetail}>{baseData.humidity}%</p></td>
                                </tr>
                                <tr className={style.trWeather}>
                                    <td><p className={style.thTitle}>Атмосферное давление</p></td>
                                    <td><p className={style.thDetail}>{Math.round(baseData.pressure/1.333)} мм.рт.ст.</p></td>
                                    <td><p className={style.thTitle}>Скорость ветра</p></td>
                                    <td><p className={style.thDetail}>{day.wind.speed}м/с</p></td>
                                </tr>
                                </tbody>
                            </table>
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