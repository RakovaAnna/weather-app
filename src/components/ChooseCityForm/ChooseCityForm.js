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
        this.props.onCitySelect(this.state.city);
    }

    render() {
        const {city} = this.state;
        return (
            <form onSubmit={this.onSubmit}>
                <input type="text" name="city" placeholder="Выбор города" value={city} onChange={this.onCityChange}/>
                <button>Узнать погоду</button>
            </form>
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
