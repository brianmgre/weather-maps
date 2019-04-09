import React from "react";

import withStyles from "@material-ui/core/styles/withStyles";
import { styles } from "../styles/weatherListStyle";

const WeatherList = props => {
  const { classes } = props;

  if (props.weather.length === 0) {
    return <h1>loading...</h1>;
  }

  const allWeatherIcons = "http://openweathermap.org/img/w/";
  const weathericon = `${allWeatherIcons}${props.weather.weather[0].icon}.png`;
  const description = props.weather.weather[0].description;

  return (
    <div className={classes.root}>
      <img src={weathericon} alt={description} />
      <h1 className={classes.Weatherdescription}>{description}</h1>
      <p className={classes.date}>
        {props.weather.dt_txt ? date(props.weather.dt_txt) : null}
      </p>
      <p className={classes.dateTime}>
        {props.weather.dt_txt ? time(props.weather.dt_txt) : null}
      </p>
      <p className={classes.display}>Temp: {props.weather.main.temp}°</p>
      <p className={classes.display}>High: {props.weather.main.temp_max}°</p>
      <p className={classes.display}>Low: {props.weather.main.temp_min}°</p>
      <p className={props.weather.dt_txt ? classes.hidden : classes.display}>
        humidity: {props.weather.main.humidity}%
      </p>
      <p className={props.weather.dt_txt ? classes.hidden : classes.display}>
        Wind Speed: {props.weather.wind.speed}mph
      </p>
      <p className={props.weather.dt_txt ? classes.hidden : classes.display}>
        Visibility: {props.weather.visibility ? props.weather.visibility : null}
      </p>
    </div>
  );
};

function date(d) {
  let dateStr = d.split(" ");
  return dateStr[0];
}

function time(t) {
  let y = t.split(" ");
  const intTime = parseInt(y[1], 10);
  if (intTime === 0) {
    return "12:00 am";
  } else if (intTime < 12) {
    return y[1].slice(0, -3) + " am";
  } else if (intTime === 12) {
    return "12:00 pm";
  } else {
    let z = intTime * 100 - 1200;
    let l = ":" + z.toString().slice(-2) + " pm";
    return z.toString().replace("00", l);
  }
}

export default withStyles(styles)(WeatherList);
