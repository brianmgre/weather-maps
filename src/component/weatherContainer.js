import React, { Component } from "react";

class WeatherContainer extends Component {
  constructor(props) {
    super();
    this.state = {
      weather: []
    };
  }

  render() {
    console.log(this.state.props);
    return <div>heyo</div>;
  }
}

export default WeatherContainer;
