import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

class WeatherCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dayOfWeek: this.props.dayOfWeek,
            date: this.props.date,
            picture: this.props.picture,
            high: this.props.high,
            low: this.props.low
        }
    }

    render() {
        return (
            <div className="card">
                <div className="dayOfWeek">{this.props.dayOfWeek}</div>
                <div className="date">{this.props.date}</div>
                <div className="picture"><img src={this.props.picture} height="100" width="100"/></div>
                <div className="high">High: {this.props.high} &#176;F</div>
                <div className="low">Low: {this.props.low} &#176;F</div>
            </div>
        );
    }
}

export default WeatherCard;
