import React, {Component} from "react";
import s from './ChooseCityForm.module.css';
import {fetchData, setCity} from "../../redux/actionsCreators";
import {connect} from "react-redux";

class ChooseCityForm extends Component {

    state = {
        city: '',
    }

    onCityChange = (e) => {
        this.setState({
            city: e.target.value,
        });
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.onSetCity(this.state.city);
        this.setState({
            city: "",
        });
    }

    render() {
        const {city} = this.state;
        return (
            <div className="row">
                <div className="col col-sm-12">
                    <form onSubmit={this.onSubmit}>
                        <div className="input-group input-group-lg">
                            <input type="text" name="city" className="form-control" placeholder="Выбор города"
                                   value={city} onChange={this.onCityChange}/>
                            <div className="input-group-append">
                                <button className="btn btn-secondary">Узнать погоду</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ...state,
        city: state.city
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSetCity: (city) => dispatch(setCity(city)),
    }
}

export const ChooseCity = connect(mapStateToProps, mapDispatchToProps)(ChooseCityForm);
