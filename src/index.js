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
   let that = this;
   fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=e037ca3eda432f477d3b985e6c2a8437`)
    .then(function (response) {
       return response.json();
     }).then(function (result) {
      var forecast = [];
      var i;
      for (i = 0; i < 5; i += 1) {
        var min = (parseInt(result.list[i].main.temp_min) * 9/5) - 459.67
        var max = (parseInt(result.list[i].main.temp_max) * 9/5) - 459.67
        var day = {
          "date": result.list[i].dt_txt,
          "picture": "./sunny.png",
          "temp_min": min.toFixed(1),
          "temp_max": max.toFixed(1)
        };
        forecast.push(day);

      }
      // that.setState({"city": city, "weatherInfo": forecast})
      that.setState((prevState, props) => {
        return {"city": city, "weatherInfo": forecast};
      })
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
                    <div className="weatherCard" key={index}>
                      <WeatherCard 
                        date={day.date}
                        pic={day.picture}
                        high={day.temp_max}
                        low={day.temp_min}/>
                    </div>
                  );
              });
  }
 
  render() {
      return (
       <div className = "FormMain">
       <form>
        <label>
         <div className = "selector">
         City:  
         <select
           name="city"
           value={this.state.city}
           onChange={this.handleInputChange}>
           <option value="berkeley">Berkeley, CA</option>
           <option value="manhattan">New York, NY</option>
           <option value="chicago">Chicago, IL</option>
         </select>
          </div>
        </label>
       </form>
       <div className="cardHolder">
        {this.renderCardComponents()}
        </div>
       </div>
      );
 }
}

ReactDOM.render(
 <CityForm />,
 document.getElementById('root')
);
	