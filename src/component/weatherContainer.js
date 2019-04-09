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
      checkA: false,
      checkB: false,
      checkC: false
    };
  }

  componentDidMount() {
    if (this.props) {
      const lat = this.props.mapCord.lat;
      const lng = this.props.mapCord.lng;
      this.getWeather(lat, lng);
    }
  }

  getWeather = (lat, lng) => {
    if (lat) {
      axios
        .get(`${url}weather?lat=${lat}&lon=${lng}&${units}&APPID=${weatherKey}`)
        .then(res => {
          if (res && res.status === 200) {
            this.setState({ weather: res.data });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  getFiveDayForecast = (lat, lng) => {
    if (this.props.mapCord.lat && this.props.mapCord.lat) {
      axios
        .get(`${url}forecast?lat=${lat}&lon=${lng}&${units}&APPID=${hourlyKey}`)
        .then(res => {
          if (res && res.status === 200) {
            this.setState({ fiveDay: res.data });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  //watches for when lat and lng are updated
  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.getWeather(this.props.mapCord.lat, this.props.mapCord.lng);
    } else if (prevProps !== this.props.allState.showHourly) {
      this.getFiveDayForecast(this.props.allState.lat, this.props.allState.lng);
    }
  }

  render() {
    const { classes } = this.props;
    if (this.props.allState.showFiveDay) {
      return (
        <div className={classes.root}>
          <div className={classes.switches}>
            <SingleFiveHourly
              allState={this.props.allState}
              changeHandler={this.props.changeHandler}
              toggleHourly={this.props.toggleHourly}
              toggleCurrentWeather={this.props.toggleCurrentWeather}
            />
          </div>
          <FiveDayForecast
            fiveDay={this.state.fiveDay}
            showHourly={this.props.allState.showHourly}
          />
        </div>
      );
    }

    return (
      <div className={classes.root}>
        <div className={classes.switches}>
          <SingleFiveHourly
            allState={this.props.allState}
            changeHandler={this.props.changeHandler}
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
