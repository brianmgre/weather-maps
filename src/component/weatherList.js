import React from "react";

const WeatherList = props => {
  if (props.weather.length === 0) {
    return <h1>loading...</h1>;
  }

  const allWeatherIcons = "http://openweathermap.org/img/w/";
  const weathericon = `${allWeatherIcons}${props.weather.weather[0].icon}.png`;
  const description = props.weather.weather[0].description;
  return (
    <div>
      <img src={weathericon} alt={description} />
      <h1>{description}</h1>
      <div>
        <p>Location:</p>
        <h1> {props.weather.name ? props.weather.name : null}</h1>
      </div>
      <p>Current Tempature: {props.weather.main.temp}</p>
      <p>High: {props.weather.main.temp_max}</p>
      <p>Low: {props.weather.main.temp_min}</p>
      <p>humidty: {props.weather.main.humidty}</p>
      <p>Pressure: {props.weather.main.pressure}</p>
      <p>Wind Speed: {props.weather.wind.speed}</p>
      <p>
        Visibility: {props.weather.visibility ? props.weather.visibility : null}
      </p>
    </div>
  );
};

export default WeatherList;
