import React, { Component } from "react";
import axios from "axios";
import WeatherList from "./weatherList";
import FiveDayForecast from "./fiveDayForecast";
const weatherKey = process.env.REACT_APP_WEATHER_API;
const url = "http://api.openweathermap.org/data/2.5/";
const units = "units=imperial";
const weatherIcons = "http://openweathermap.org/img/w/";

class WeatherContainer extends Component {
  constructor(props) {
    super();
    this.state = {
      weather: [],
      showFiveDay: true,
      fiveDay: null
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
          console.log(res);
          if (res && res.status === 200) {
            this.setState({ weather: res.data });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
    this.getFiveDayForecast(lat, lng);
  };

  getFiveDayForecast = (lat, lng) => {
    if (this.props.mapCord.lat && this.props.mapCord.lat) {
      axios
        .get(
          `${url}forecast?lat=${lat}&lon=${lng}&${units}&APPID=${weatherKey}`
        )
        .then(res => {
          console.log(res);
          if (res && res.status === 200) {
            this.setState({ fiveDay: res.data });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.getWeather(this.props.mapCord.lat, this.props.mapCord.lng);
    }
  }

  render() {
    console.log("weather", this.state.weather);
    console.log("five", this.state.fiveDay);
    if (this.state.showFiveDay) {
      return <FiveDayForecast fiveDay={this.state.fiveDay} />;
    }

    return (
      <div>
        <WeatherList weather={this.state.weather} />
      </div>
    );
  }
}

export default WeatherContainer;
