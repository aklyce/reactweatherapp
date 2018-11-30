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
            <div className="card">
                <div className="date">{this.props.date}</div>
                <div className="high">high: {this.props.high}</div>
                <div className="low">low: {this.props.low}</div>
            </div>
        );
    }
}

export default WeatherCard;
