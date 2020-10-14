import React from "react";
import style from './WeatherCard.model.css';
import DetailedCard from "../DetailedCard/DetailedCard";
import MiniDayCard from "../MiniDayCard/MiniDayCard";
import {fetchDataNextDays, fetchDataNow} from "../../redux/actionsCreators";
import {connect} from "react-redux";

class WeatherCard extends React.Component {

    state = {
        buttonOnToday: true,
        buttonOnNextDays: false,
    }

    componentDidMount() {
        const {city, onFetchDataNow} = this.props;
        onFetchDataNow(city);
    }

    formatCards = () => {
        return this.props.nextDays.map((day, index) => <MiniDayCard day={day} key={index}/>)
    }

    onToday = () => {
        if (!this.state.buttonOnToday) {
            this.setState({
                buttonOnToday: true,
                buttonOnNextDays: false
            });
        }
        if (!this.props.nowInfo.time) {
            this.props.onFetchDataNow(this.props.city);
        }
    }

    onNextDays = () => {
        if (!this.state.buttonOnNextDays) {
            this.setState({
                buttonOnToday: false,
                buttonOnNextDays: true
            });
        }
        if (!this.props.nextDays) {
            this.props.onFetchDataNextDays(this.props.city);
        }
    }

    render() {
        const {city, nowInfo, nextDays, message} = this.props;
        return (
            <div>
                <div className="container-fluid">
                    <h2 className="card-title">{city}</h2>
                    <p className="error">{message}</p>
                    <div className="row align-items-center">
                        <button className="col-sm-6" onClick={this.onToday}>На сегодня</button>
                        <button className="col-sm-6" onClick={this.onNextDays}>На несколько дней</button>
                    </div>
                    <div>
                        {(this.state.buttonOnToday && nowInfo) &&
                        <DetailedCard day={nowInfo.weather} city={city} time={nowInfo.time}/>
                        }
                        {(!this.state.buttonOnToday && nextDays) &&
                        <div className="row justify-content-center ">
                            <div className="col-sm-8">
                                <div className="row align-items-center">
                                    {this.formatCards()}
                                </div>
                            </div>
                        </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ...state,
        nowInfo: {
            time: state.nowInfo.time,
            weather: state.nowInfo.weather
        },
        nextDays: state.nextDays,
        message: state.message
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchDataNow: (city) => dispatch(fetchDataNow(city)),
        onFetchDataNextDays: (city) => dispatch(fetchDataNextDays(city)),
    }
}

export const WeatherCardComp = connect(mapStateToProps, mapDispatchToProps)(WeatherCard);