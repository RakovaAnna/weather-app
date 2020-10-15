import React from 'react';
import style from './App.module.css';
import {ChooseCity} from "./components/ChooseCityForm/ChooseCityForm";
import {WeatherCardComp} from "./components/WeatherCard/WeatherCard";

export class App extends React.Component {

    render() {
        const {props} = this;
        return (
            <div className={`${style.main}`}>
                <h1 className={style.titleMain}>Прогноз погоды</h1>
                <div className={`${style.container} container-fluid`}>
                    <ChooseCity/>
                    <WeatherCardComp/>
                </div>
            </div>
        );
    }
}

