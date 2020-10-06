import React from "react";
import style from './WeatherCard.model.css';
import DetailedCard from "../DetailedCard/DetailedCard";
import MiniDayCard from "../MiniDayCard/MiniDayCard";

class WeatherCard extends React.Component {

    formatCards = () => {
        return this.props.days.map((day, index) => <MiniDayCard day={day} key={index}/>)
    }

    render() {
        const {props} = this;
        return (
            <div className="container-fluid">
                {props.city &&
                <div>
                    <h2 className="card-title">{props.city}</h2>
                    <div className="row justify-content-center ">
                        <div className="col-sm-4">
                            <DetailedCard day={props.today} city={props.city} time={props.time}/>
                        </div>
                        <div className="col-sm-8">
                            <div className="row align-items-center">
                                {this.formatCards()}
                            </div>
                        </div>
                    </div>
                </div>
                }
                <p className="error">{props.error}</p>
            </div>
        )
    }
}

export default WeatherCard;