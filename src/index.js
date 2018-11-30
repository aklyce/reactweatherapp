import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import WeatherCard from "./WeatherCard.js"

class CityForm extends React.Component {
 constructor(props) {
  super(props);
  this.state = {"city": "berkeley", "weatherInfo": []};
  this.handleInputChange = this.handleInputChange.bind(this);
 }

 getWeather(city) {
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
   let that = this;
   fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=e037ca3eda432f477d3b985e6c2a8437`)
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
        if (description.includes("rain")) {
            icon = "./weatherImages/rainy.png";
        } else if (description.includes("cloud")) {
            icon = "./weatherImages/cloudy.png";
        } else if (description.includes("sun") || description.includes("clear")) {
          icon = "./weatherImages/sun.png";
        }
        var date = result.list[i].dt_txt
        var dateObj = new Date(date);
        var day = {
          "dayOfWeek": dayNames[dateObj.getDay()],
          "date": date.split(" ")[0],
          "picture": icon,
          "temp_min": min.toFixed(1),
          "temp_max": max.toFixed(1)
        };
        forecast.push(day);

      }
      that.setState({"city": city, "weatherInfo": forecast})
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

  renderCardComponents() {
      return Object.values(this.state.weatherInfo).map((day, index) => {
                  return (
                    <div class="col">
                    <div className="weatherCard" key={index}>
                      <WeatherCard
                        dayOfWeek={day.dayOfWeek}
                        date={day.date}
                        picture={day.picture}
                        high={day.temp_max}
                        low={day.temp_min}/>
                    </div>
                    </div>
                  );
              });
  }

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
	