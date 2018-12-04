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
            weather: this.props.weather,
            click: false,
            weatherState : '',
            activities : '',
            weathers : []
        }
        this.handleClick = this.handleClick.bind(this);
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
              //weather: this.state.weather
            });
          }
          this.setState({
            weathers: newState
          });
        });
      }
    render() {
        const rsvpItems = this.state.weathers.map((rsvp) =>
        <Item key={rsvp.id} id={rsvp.id} weatherState={rsvp.weatherState}  realweather = {this.props.weather} activities={rsvp.activities} />
        );
        return (
            <div className="card" onClick={this.handleClick}>
                <div className="dayOfWeek">{this.props.dayOfWeek}</div>
                <div className="date">{this.props.date}</div>
                <div className="picture"><img src={this.props.picture} height="100" width="100"/></div>
                <div className="high">High: {this.props.high} &#176;F</div>
                <div className="low">Low: {this.props.low} &#176;F</div>
                <div>{this.state.click? 'ON' : ''}</div>
                <div>
                <ul>
                    {rsvpItems}
                </ul>
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
                <li >
                {this.props.weatherState}: {this.props.activities}
                </li>
            );
        }else{
            return null;
        }
    }
  }


export default WeatherCard;
