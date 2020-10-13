import React, {Component} from "react";
import s from './ChooseCityForm.module.css';

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
      this.props.onCitySelect(this.state.city);
    }

    render() {
        const {city} = this.state;
        return (
        <form onSubmit={this.onSubmit}>
          <input type="text" name="city" placeholder="Выбор города" value={city} onChange={this.onCityChange} />
          <button>Узнать погоду</button>
        </form>
        )
    }
}

export default ChooseCityForm;

