import React from "react";
import style from './WeatherCard.module.css';
import DetailedCard from "../DetailedCard/DetailedCard";
import MiniDayCard from "../MiniDayCard/MiniDayCard";
import {fetchDataNextDays, fetchDataNow} from "../../redux/actionsCreators";
import {connect} from "react-redux";

class WeatherCard extends React.Component {

    state = {
        controlTab: true,
    }

    componentDidMount() {
        const {city, onFetchDataNow} = this.props;
        onFetchDataNow(city);
    }

    formatCards = () => {
        return this.props.nextDays.map((day, index) => <MiniDayCard day={day} key={index}/>)
    }

    onToday = () => {
        if (!this.state.controlTab) {
            this.setState({
                controlTab: true,
            });
        }
        if (!this.props.nowInfo.time) {
            this.props.onFetchDataNow(this.props.city);
        }
    }

    onNextDays = () => {
        if (this.state.controlTab) {
            this.setState({
                controlTab: false,
            });
        }
        if (!this.props.nextDays) {
            this.props.onFetchDataNextDays(this.props.city);
        }
    }

    render() {
        const {city, nowInfo, nextDays, message} = this.props;
        const isToday = this.state.controlTab;
        return (
            <div>
                <div>
                    <div className={`row align-items-center ${style.toolbar}`}>
                        <div className="col-sm-6">
                            <button className={`${isToday ? 'btn btn-secondary' : 'btn btn-outline-secondary'}`} onClick={this.onToday}>На сегодня
                            </button>
                        </div>
                        <div className="col-sm-6">
                            <button className={`${!isToday ? 'btn btn-secondary' : 'btn btn-outline-secondary'}`} onClick={this.onNextDays}>На несколько дней
                            </button>
                        </div>
                    </div>
                    <h2 className={style.titleCard}>Погода в городе "{city}"</h2>
                    <p className={style.error}>{message}</p>

                    <div>
                        {(this.state.controlTab && nowInfo) &&
                        <DetailedCard day={nowInfo.weather} city={city} time={nowInfo.time}/>
                        }
                        {(!this.state.controlTab && nextDays) &&
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