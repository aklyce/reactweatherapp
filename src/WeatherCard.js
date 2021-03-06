import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import firebase from './firebase.js';


class WeatherCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dayOfWeek: this.props.dayOfWeek,
            date: this.props.date,
            picture: this.props.picture,
            high: this.props.high,
            low: this.props.low,
            humidity: this.props.humidity,
            windspeed: this.props.windspeed,
            weather: this.props.weather,
            details: false,
            weatherState : '',
            activities : '',
            weathers : []
        }
        this.handleClick = this.handleClick.bind(this);
        this.showDetails = this.showDetails.bind(this);
    }
    handleClick() {
        this.setState(state => ({
            click: !state.click
          }));
    }
    componentDidMount() {
        const weathersRef = firebase.database().ref('weathers');
        weathersRef.on('value', (snapshot) => {
          let weathers = snapshot.val();
          let newState = [];
          for (let weather in weathers) {
            newState.push({
              id: weather,
              weatherState: weathers[weather].weatherState,
              activities: weathers[weather].activities,
            });
          }
          this.setState({
            weathers: newState
          });
        });
      }
    showDetails() {
        var newState = this.state;
        newState.details = !this.state.details;
        this.setState(newState);
    }


    render() {
        var u = "";
        var wu = "";
        if (this.props.unit == "imperial") {
            u = "F";
            wu = "mph"
        } else {
            u = "C";
            wu = "m/s"
        }

        var show = "none";
        if (this.state.details) {
            show = ""
        }
        const rsvpItems = this.state.weathers.map((rsvp) =>
        <Item key={rsvp.id} id={rsvp.id} weatherState={rsvp.weatherState}  realweather = {this.props.weather} activities={rsvp.activities} />
        );
        return (
            <div className="card" onClick={this.handleClick}>
                <div className="dayOfWeek">{this.props.dayOfWeek}</div>
                <div className="date">{this.props.date}</div>
                <div className="picture"><img src={this.props.picture} height="100" width="100"/></div>
                <div className="items">
                <div className="high"><span className="item">HIGH</span> {this.props.high} &#176;{u}</div>
                <div className="low"><span className="item">LOW</span> {this.props.low} &#176;{u}</div>
                <div className="humidity"><span className="item">HUMIDITY</span> {this.props.humidity}</div>
                <div className="low"><span className="item">WIND</span> {this.props.windspeed} {wu}</div>
                </div>

                <div>
                <p>
                  <button class="btn btn-secondary btn-sm details" type="button" onClick={this.showDetails}>Activities</button>
                </p>
                <div class="details" style={{display: show}}>

                    <div className = "activities">
                        {rsvpItems}
                    </div>
                </div>
                </div>
            </div>
        );
    }
}

class Item extends React.Component {
    constructor(props) {
      super(props);
  
    }
  
    render() {
        let realweather = this.props.realweather
        if (this.props.weatherState == realweather) {
            return (
                <div>
                {this.props.activities}
                </div>
            );
        }else{
            return null;
        }
    }
  }


export default WeatherCard;
