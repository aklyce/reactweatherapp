import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

class WeatherCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            day: this.props.day,
            picture: this.props.picture,
            high: this.props.high,
            low: this.props.low
        }
    }

    render() {
        return (
            <div>
                <div className="day">{this.state.day}</div>
                <div className="pic">{this.state.picture}</div>
                <div className="high">{this.state.high}</div>
                <div className="low">{this.state.low}</div>
            </div>
        );
    }
}

