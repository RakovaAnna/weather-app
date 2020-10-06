import React from "react";
import style from './ChooseCityForm.model.css';

class ChooseCityForm extends React.Component {
    render() {
        return (
            <form onSubmit={this.props.weather}>
                <input type="text" name="city" placeholder="Выбор города"/>
                <button>Узнать погоду</button>
            </form>
        )
    }
}

export default ChooseCityForm;

