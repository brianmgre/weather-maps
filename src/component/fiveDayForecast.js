import React from "react";
import WeatherList from "./weatherList";

const FiveDayForecast = props => {
  if (!props.fiveDay) {
    return <h1>loading...</h1>;
  }

  const forecastHourly = (
    <div>
      {props.fiveDay.list.map(five => (
        <div key={five.dt}>
          <WeatherList weather={five} />
        </div>
      ))}
    </div>
  );

  const filteredForecast = props.fiveDay.list.filter(
    five => five.dt_txt.indexOf("12:00") !== -1
  );

  const filterWeather = (
    <div>
      {filteredForecast.map(five => (
        <div key={five.dt}>
          <WeatherList weather={five} />
        </div>
      ))}
    </div>
  );
  console.log("filter", filteredForecast);
  return (
    <div>
      <h1>{props.fiveDay.city.name}</h1>
      {/* {forecastHourly} */}

      {filterWeather}
    </div>
  );
};

export default FiveDayForecast;
