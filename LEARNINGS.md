Our project is an application which retrieves and presents information about the weather of cities in the United States. The user may choose the city for which they would like to see a five day weather forecast. The name of the chose city is displayed at the top of the page. The forecast for each day is presented in a card and contains information such as the high and low temperatures of the day, the humidity, windspeed, as well as a representative image chosen based on the description of the weather (sunny, cloudy, rainy, snowy, etc). The user may click ‘Activities’ to learn suggested activities based on the weather. The user may choose to view the temperatures in Fahrenheit or Celsius by clicking the buttons near the top, and this also changes the units used for windspeeds (mph vs. meters/s). 

Ten web technologies used:
1. css - margin and padding of components, show/hide certain html elements on user preference
2. firebase - stores list of suggested activities
3. bootstrap - makes web page elements look more aesthetic and cohesive, container rows and columns neatly organize different components
4. json - data structure retrieved from openweather api; data structure used to store list of city names and list of suggested activities
5. html - used to format  layout of web page
6. javascript - supports dynamic functionalities on page (clicking to change unit, clicking to show details, selecting city)
7. openweather api - source from which application gets weather information
8. react - generalizes html elements so they can be more dynamic and reusable, the weather of each day in the five day forecast is represented as a WeatherCard react component
9. node.js - runs web app
10. babel - configures settings to run web app
