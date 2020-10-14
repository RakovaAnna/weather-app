import React from 'react';
import './App.model.css';
import {ChooseCity} from "./components/ChooseCityForm/ChooseCityForm";
import WeatherCard from "./components/WeatherCard/WeatherCard";
import {connect} from "react-redux";
import {fetchData} from "./redux/actionsCreators";

class AppComponent extends React.Component {

    componentDidMount() {
        const {city, onFetchData} = this.props;
        onFetchData(city);
    }

    handleCitySelect = (city) => {
        this.props.onFetchData(city);
    }

    render() {
        const {props} = this;
        const {city, now, nextDays, message} = props;
        return (
            <div className="main">
                <h1 className="info">Прогноз погоды</h1>
                <ChooseCity
                    onCitySelect={this.handleCitySelect}
                />
                <WeatherCard city={city} time={now.time} today={now.weather} days={nextDays}
                             message={message}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        city: state.city,
        now: {
            time: state.now.time,
            weather: state.now.weather
        },
        nextDays: state.nextDays,
        message: state.message
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchData: (city) => dispatch(fetchData(city))
    }
}

export const App = connect(mapStateToProps, mapDispatchToProps)(AppComponent);

