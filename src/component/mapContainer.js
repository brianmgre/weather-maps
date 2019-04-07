import React, { Component } from "react";
import mapboxgl from "mapbox-gl";
import "./styles/map.css";
import WeatherContainer from "./weatherContainer";

mapboxgl.accessToken = process.env.REACT_APP_MAP_API;
const weatherKey = process.env.REACT_APP_WEATHER_API;
const map = null;

class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: -51,
      lat: 34,
      zoom: 1.5,
      vis: "visible",
      clouds: true
    };
  }

  componentDidMount() {
    const { lng, lat, zoom } = this.state;

    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/mapbox/streets-v9",
      center: [lng, lat],
      zoom
    });

    this.map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true
      })
    );

    this.map.on("click", e => {
      this.map.flyTo({ center: e.lngLat, zoom: 8 });

      this.setState({
        lng: e.lngLat.lng.toFixed(2),
        lat: e.lngLat.lat.toFixed(2)
      });
    });
  }

  hi = (x, y) => event => {
    if (
      this.map.getSource(x) &&
      this.map.getLayoutProperty(x, "visibility") === "none"
    ) {
      this.map.setLayoutProperty(x, "visibility", "visible");
    } else if (
      this.map.getSource(x) &&
      this.map.getLayoutProperty(x, "visibility") === "visible"
    ) {
      this.map.setLayoutProperty(x, "visibility", "none");
    } else if (!this.map.getSource(x)) {
      this.map.addSource(x, {
        type: "raster",
        tiles: [
          `https://tile.openweathermap.org/map/${y}/{z}/{x}/{y}.png?appid=${weatherKey}`
        ],
        tileSize: 256
      });
      this.map.addLayer({
        id: x,
        type: "raster",
        source: x,
        minzoom: 0,
        maxzoom: 22,
        layout: {
          visibility: "visible"
        }
      });
    }
  };

  remove = () => {
    this.map.setLayoutProperty("temp", "visibility", "none");
    console.log(this.map.getSource("temp"));
  };

  render() {
    console.log(this.state);
    const { lng, lat, zoom } = this.state;

    return (
      <div>
        <div>
          <div>{`Longitude: ${lng} Latitude: ${lat} Zoom: ${zoom}`}</div>
          <div ref={el => (this.mapContainer = el)} className="map" />
        </div>
        <WeatherContainer mapCord={this.state} />
        <button onClick={this.hi("temp", "temp_new")}>Temp</button>
        <button onClick={this.hi("clouds", "clouds_new")}>Clouds</button>
        <button onClick={this.hi("rain", "precipitation_new")}>Rain</button>
        <button onClick={this.hi("wind", "wind_new")}>wind</button>
      </div>
    );
  }
}

export default MapContainer;
