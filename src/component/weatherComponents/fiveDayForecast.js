import React from "react";
import WeatherList from "./weatherList";

import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
import { styles } from "../styles/fiveDayForecastStyle";
import Typography from "@material-ui/core/Typography";

const FiveDayForecast = props => {
  const { classes } = props;

  if (!props.fiveDay) {
    return <h1>loading...</h1>;
  }

  //maps through array of hourly forecast
  const forecastHourly = (
    <Grid container spacing={8} className={classes.gridFive}>
      {props.fiveDay.list.map(five => (
        <Grid item lg={2} xs={12} md={5} sm={6} key={five.dt}>
          <WeatherList weather={five} />
        </Grid>
      ))}
    </Grid>
  );

  //filters hourly forecast into 5 results
  const filteredForecast = props.fiveDay.list.filter(
    five => five.dt_txt.indexOf("12:00") !== -1
  );

  //maps filtered array
  const filterWeather = (
    <Grid container spacing={8} className={classes.gridHourly}>
      {filteredForecast.map(five => (
        <Grid item lg={2} xs={12} md={5} sm={6} key={five.dt}>
          <WeatherList weather={five} />
        </Grid>
      ))}
    </Grid>
  );

  if (props.showHourly) {
    return (
      <div className={classes.root}>
        <Typography variant="h2" className={classes.locationName}>
          {props.fiveDay.city.name}
        </Typography>
        {forecastHourly}
      </div>
    );
  }
  return (
    <div className={classes.root}>
      <Typography variant="h2" className={classes.locationName}>
        {props.fiveDay.city.name}
      </Typography>
      {filterWeather}
    </div>
  );
};

export default withStyles(styles)(FiveDayForecast);
