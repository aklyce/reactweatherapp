import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

class WeatherCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: this.props.date,
            picture: this.props.picture,
            high: this.props.high,
            low: this.props.low
        }
    }

    render() {
        return (
            <div>
                <div className="date">{this.state.date}</div>
                <div className="high">{this.state.high}</div>
                <div className="low">{this.state.low}</div>
            </div>
        );
    }
}

export default WeatherCard;
