import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import WeatherCard from "./WeatherCard.js"
import firebase from './firebase.js';

const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

class CityForm extends React.Component {
 constructor(props) {
  super(props);
  this.state = {"city": "berkeley", "weatherInfo": [], "unit": "imperial"};
  this.handleInputChange = this.handleInputChange.bind(this);
  this.handleUnitChange = this.handleUnitChange.bind(this);
 }

 getWeather(city) {
   let that = this;
   fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${that.state.unit}&appid=e037ca3eda432f477d3b985e6c2a8437`)
    .then(function (response) {
       return response.json();
     }).then(function (result) {
      var forecast = [];
      var i;
      for (i = 0; i < result.list.length; i += 8) {
        var min = Number(result.list[i].main.temp_min);
        var max = Number(result.list[i].main.temp_max) + 3.4;
        var description = result.list[i].weather[0].description;
        var icon = "./weatherImages/cloud.png";
        var weather = "Sunny";
        if (description.includes("rain")) {
            icon = "./weatherImages/rainy.png";
            weather = "Rainy";
        } else if (description.includes("cloud")) {
            icon = "./weatherImages/cloudy.png";
            weather = "Cloudy";
        } else if (description.includes("sun") || description.includes("clear")) {
            icon = "./weatherImages/sun.png";
            weather = "Sunny";
        }
        var date = result.list[i].dt_txt
        var dateObj = new Date(date);
        var day = {
          "dayOfWeek": dayNames[dateObj.getDay()],
          "date": date.split(" ")[0],
          "picture": icon,
          "temp_min": min.toFixed(1),
          "temp_max": max.toFixed(1),
          "weather": weather
        };
        forecast.push(day);

      }
      that.setState({"city": city, "weatherInfo": forecast, "unit": that.state.unit});
     });
 }

 componentDidMount() {
   this.getWeather(this.state.city);
 }
 handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.getWeather(value);
  }

  handleUnitChange(event) {
    const target = event.target;
    const unit = target.value;
   let that = this;
   fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${that.state.city}&units=${unit}&appid=e037ca3eda432f477d3b985e6c2a8437`)
    .then(function (response) {
       return response.json();
     }).then(function (result) {
      var forecast = [];
      var i;
      for (i = 0; i < result.list.length; i += 8) {
        var min = Number(result.list[i].main.temp_min);
        var max = Number(result.list[i].main.temp_max) + 3.4;
        var description = result.list[i].weather[0].description;
        var icon = "./weatherImages/cloud.png";
        var weather = "Sunny";
        if (description.includes("rain")) {
            icon = "./weatherImages/rainy.png";
            weather = "Rainy";
        } else if (description.includes("cloud")) {
            icon = "./weatherImages/cloudy.png";
            weather = "Cloudy";
        } else if (description.includes("sun") || description.includes("clear")) {
            icon = "./weatherImages/sun.png";
            weather = "Sunny";
        }
        var date = result.list[i].dt_txt
        var dateObj = new Date(date);
        var day = {
          "dayOfWeek": dayNames[dateObj.getDay()],
          "date": date.split(" ")[0],
          "picture": icon,
          "temp_min": min.toFixed(1),
          "temp_max": max.toFixed(1),
          "weather": weather
        };
        forecast.push(day);

      }
      that.setState({"city": that.state.city, "weatherInfo": forecast, "unit": unit});
     });

  }

  renderCardComponents() {
      console.log(this.state.unit);
      return Object.values(this.state.weatherInfo).map((day, index) => {
                  return (
                    <div class="col">
                    <div className="weatherCard" key={index}>
                      <WeatherCard
                        dayOfWeek={day.dayOfWeek}
                        date={day.date}
                        picture={day.picture}
                        high={day.temp_max}
                        low={day.temp_min}
                        weather = {day.weather}
                        unit = {this.state.unit}/>
                    </div>
                    </div>
                  );
              });
  }

  // changeUnitImperial() {
  //   this.setState({"city": this.state.city, "weatherInfo": this.state.weatherInfo, "unit": "imperial"});

  // }

  // changeUnitMetric() {
  //   console.log("set metric");
  //   this.setState({"city": this.state.city, "weatherInfo": this.state.weatherInfo, "unit": "metric"});

  // }

  renderOptions() {
    var cities = require('./cities.json').sort();
    return Object.values(cities).map((city, index) => {
            return (
                <option value={city} key={index}>{this.titleCase(city)}</option>
            );
        });
  }

  titleCase(str) {
   var splitStr = str.toLowerCase().split(' ');
   for (var i = 0; i < splitStr.length; i++) {
       splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
   }
   return splitStr.join(' '); 
}
 
  render() {
    return (
      <div class="p-5">
        <center>
          <div class="w-80 p-3">
            <div class="jumbotron">
              <h1 class="display-4">Weather</h1>
              <h3 class="display-6">{this.titleCase(this.state.city)}</h3>
              <hr class="my-4" />
              <div class="container">
                <div class="row">
                  <div class="col">
                    <div class="d-flex justify-content-center">
                      <button type="button" class="btn btn-outline-info unit" value="imperial" onClick={this.handleUnitChange}>&#176;F</button>
                      <button type="button" class="btn btn-outline-info unit" value="metric" onClick={this.handleUnitChange}>&#176;C</button>
                      <form>
                        <select class="custom-select" name="city" onChange={this.handleInputChange}>
                          <option selected>Select city</option>
                          {this.renderOptions()}
                        </select>
                      </form>
                    </div>
                  </div>
                </div>
                <div class="row">
                    {this.renderCardComponents()}
                </div>
              </div>
            </div>
          </div>
        </center>
      </div>
    );
  }
}

ReactDOM.render(
 <CityForm />,
 document.getElementById('root')
);
	