import React from "react";

class FormChooseCity extends React.Component {
    render() {
        return (
            <form onSubmit={this.props.weather}>
                <input type="text" name="city" placeholder="Выбор города"/>
                <button>Узнать погоду</button>
            </form>
        )
    }
}

export default FormChooseCity;

