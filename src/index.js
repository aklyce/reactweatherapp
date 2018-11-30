import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

class CityForm extends React.Component {
 constructor(props) {
  super(props);
  this.state = {city: 'berkeley', temp: 0, 
                lon:0, lat: 0, 
                temp_min: 0, temp_max : 0,
                humidity : 0};
  this.handleInputChange = this.handleInputChange.bind(this);
 }

 getWeather(city) {
   let that = this;
   fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e037ca3eda432f477d3b985e6c2a8437`)
    .then(function (response) {
       return response.json();
     }).then(function (result) {
       that.setState({"temp":result.main.temp - 273.15, "city":city})
       that.setState({"lon":result.coord.lon, "city":city})
       that.setState({"lat":result.coord.lat, "city":city})
       that.setState({"temp_min":result.main.temp_min - 273.15, "city":city})
       that.setState({"temp_max":result.main.temp_max - 273.15, "city":city})
       that.setState({"humidity":result.main.humidity, "city":city})
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
   {/* <div>The temperature (in celsius) of {this.state.city} is {this.state.temp}</div> */}
   <div className = "OutputWeather">
         <div>The coordinates of {this.state.city} is ({this.state.lon}, {this.state.lat})</div>
         <div className = "Lowest">The lowest temperature(in celsius) of {this.state.city} is {this.state.temp_min}</div> 
         <div className = "Highest">The highest temperature(in celsius) of {this.state.city} is {this.state.temp_max}</div> 
         <div>The humidity of {this.state.city} is {this.state.humidity}</div>     
         </div>     
   </div>
  );
 }
}
ReactDOM.render(
 <CityForm />,
 document.getElementById('root')
);
	