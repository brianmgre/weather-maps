import React, { Component } from "react";
import axios from "axios";
import WeatherList from "./weatherComponents/weatherList";
import FiveDayForecast from "./weatherComponents/fiveDayForecast";
import SingleFiveHourly from "./forms/singleFiveHourlyForm";

import { Typography } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import { styles } from "./styles/weatherContainerStyle";

const hourlyKey = process.env.REACT_APP_HOURLY_API;
const weatherKey = process.env.REACT_APP_WEATHER_API;
const url = "https://api.openweathermap.org/data/2.5/";
const units = "units=imperial";

class WeatherContainer extends Component {
  constructor(props) {
    super();
    this.state = {
      weather: [],
      fiveDay: null,
      apiFail: false
    };
  }

  componentDidMount() {
    if (this.props) {
      const lat = this.props.mapCordLat;
      const lng = this.props.mapCordLng;
      this.getWeather(lat, lng);
    }
  }

  getWeather = (lat, lng) => {
    if (lng) {
      axios
        .get(`${url}weather?lat=${lat}&lon=${lng}&${units}&APPID=${weatherKey}`)
        .then(res => {
          if (res && res.status === 200) {
            this.setState({ weather: res.data });
          }
        })
        .catch(err => {
          this.setState({ apiFail: true });
        });
    }
    this.getFiveDayForecast(lat, lng);
  };

  getFiveDayForecast = (lat, lng) => {
    if (this.state.weather) {
      axios
        .get(`${url}forecast?lat=${lat}&lon=${lng}&${units}&APPID=${hourlyKey}`)
        .then(res => {
          if (res && res.status === 200) {
            this.setState({ fiveDay: res.data });
          }
        })
        .catch(err => {
          this.setState({ apiFail: true });
        });
    }
  };

  //watches for when lat and lng are updated
  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.getWeather(this.props.mapCordLat, this.props.mapCordLng);
    }
  }

  render() {
    const { classes } = this.props;

    if (this.state.apiFail) {
      return (
        <Typography variant="h3" className={classes.currentName}>
          Weather is currently not available
        </Typography>
      );
    } else if (this.props.showFiveDay) {
      return (
        <div className={classes.root}>
          <div className={classes.switches}>
            <SingleFiveHourly
              checkF={this.state.checkF}
              checkE={this.state.checkE}
              changeHandler={this.props.changeHandler}
              toggleHourly={this.props.toggleHourly}
              toggleCurrentWeather={this.props.toggleCurrentWeather}
              showFiveDay={this.props.showFiveDay}
            />
          </div>
          <FiveDayForecast
            fiveDay={this.state.fiveDay}
            showHourly={this.props.showHourly}
          />
        </div>
      );
    }

    return (
      <div className={classes.root}>
        <div className={classes.switches}>
          <SingleFiveHourly
            changeHandler={this.props.changeHandler}
            showHourly={this.state.showHourly}
            showFiveDay={this.state.showFiveDay}
            toggleCurrentWeather={this.props.toggleCurrentWeather}
          />
        </div>
        <div className={classes.currentWeather}>
          <Typography variant="h3" className={classes.currentName}>
            {this.state.weather.name}
          </Typography>
          <WeatherList weather={this.state.weather} />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(WeatherContainer);
