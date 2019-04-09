import React from "react";
import WeatherList from "./weatherList";
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
import { styles } from "./styles/fiveDayForecastStyle";

const FiveDayForecast = props => {
  const { classes } = props;

  if (!props.fiveDay) {
    return <h1>loading...</h1>;
  }

  const forecastHourly = (
    <Grid container spacing={8} className={classes.gridFive}>
      {props.fiveDay.list.map(five => (
        <Grid item lg={2} xs={12} md={5} sm={6} key={five.dt}>
          <WeatherList weather={five} />
        </Grid>
      ))}
    </Grid>
  );

  const filteredForecast = props.fiveDay.list.filter(
    five => five.dt_txt.indexOf("12:00") !== -1
  );

  const filterWeather = (
    <Grid container spacing={10} className={classes.gridHourly}>
      {filteredForecast.map(five => (
        <Grid item lg={2} xs={12} md={5} sm={6} key={five.dt}>
          <WeatherList weather={five} />
        </Grid>
      ))}
    </Grid>
  );
  console.log("filter", filteredForecast);

  if (props.showHourly) {
    return (
      <div className={classes.root}>
        <h1>{props.fiveDay.city.name}</h1>
        {forecastHourly}
      </div>
    );
  }
  return (
    <div className={classes.root}>
      <h1>{props.fiveDay.city.name}</h1>
      {filterWeather}
    </div>
  );
};

export default withStyles(styles)(FiveDayForecast);
