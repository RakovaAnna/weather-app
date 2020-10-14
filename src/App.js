import React from 'react';
import './App.module.css';
import {ChooseCity} from "./components/ChooseCityForm/ChooseCityForm";
import {WeatherCardComp} from "./components/WeatherCard/WeatherCard";
import {connect} from "react-redux";
import {fetchDataNextDays, fetchDataNow} from "./redux/actionsCreators";

export class App extends React.Component {

    render() {
        const {props} = this;
        return (
            <div className="main">
                <h1 className="info">Прогноз погоды</h1>
                <ChooseCity/>
                <WeatherCardComp/>
            </div>
        );
    }
}

