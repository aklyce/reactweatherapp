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
      let forecast = [];
      var i;
      for (i = 0; i < 5; i += 1) {
        day = {
          "date": result.list.dt_txt,
          "picture": "./sunny.png",
          "temp_min": result.list.main.temp_min,
          "temp_max": result.list.main.temp_max
        };
        forecast.push(day)

      }
      that.setState({"city": result.city.name, "weatherInfo": forecast})
     });
 }

 componentDidMount() {
   this.getWeather(this.state.city);
 }
 handleInputChange(event) {
    console.log("handle input change");
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.getWeather(value);
  }

  renderCardComponents() {
    console.log(this.state.weatherInfo);
    return (<div>{this.state.weatherInfo}</div>);
      // return Object.values(this.state.weatherInfo).map((day, index) => {
      //             return (
      //                 <WeatherCard 
      //                   date={day.date}
      //                   pic={day.picture}
      //                   high={day.temp_max}
      //                   low={day.temp_min}/>

      //             );
      //         });
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
   {this.renderCardComponents()}
   </div>
  );
 }
}

ReactDOM.render(
 <CityForm />,
 document.getElementById('root')
);
	