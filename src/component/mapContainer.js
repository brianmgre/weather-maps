import React, { Component } from "react";
import mapboxgl from "mapbox-gl";
import "./styles/map.css";
import WeatherContainer from "./weatherContainer";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import Navbar from "./navBar";

mapboxgl.accessToken = process.env.REACT_APP_MAP_API;
const weatherKey = process.env.REACT_APP_WEATHER_API;

const geocoder = new MapboxGeocoder({
  accessToken: mapboxgl.accessToken
});

class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: -51,
      lat: 34,
      zoom: 1.5
    };
  }

  componentDidMount() {
    const { lng, lat, zoom } = this.state;

    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom,
      results: [],
      focus: null,
      loading: false
    });

    this.map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
          trigger: true
        },
        trackUserLocation: true
      })
    );

    this.map.on("click", e => {
      this.map.flyTo({ center: e.lngLat, zoom: 13 });

      this.setState({
        lng: e.lngLat.lng.toFixed(2),
        lat: e.lngLat.lat.toFixed(2)
      });
    });

    // setTimeout(() => {
    //   this.hi();
    // }, 3000);
    this.map.addControl(geocoder);
    geocoder.on("result", e => {
      console.log(e.result);
      this.setState({ lng: e.result.center[0], lat: e.result.center[1] });
    });
  }

  setLayer = (element, mapType) => event => {
    if (
      this.map.getSource(element) &&
      this.map.getLayoutProperty(element, "visibility") === "none"
    ) {
      this.map.setLayoutProperty(element, "visibility", "visible");
    } else if (
      this.map.getSource(element) &&
      this.map.getLayoutProperty(element, "visibility") === "visible"
    ) {
      this.map.setLayoutProperty(element, "visibility", "none");
    } else if (!this.map.getSource(element)) {
      this.map.addSource(element, {
        type: "raster",
        tiles: [
          `https://tile.openweathermap.org/map/${mapType}/{z}/{x}/{y}.png?appid=${weatherKey}`
        ],
        tileSize: 256
      });
      this.map.addLayer({
        id: element,
        type: "raster",
        source: element,
        minzoom: 0,
        maxzoom: 22,
        layout: {
          visibility: "visible"
        }
      });
    }
  };

  render() {
    console.log("state", this.state);
    // const { lng, lat, zoom } = this.state;

    return (
      <div>
        <Navbar />
        <div>
          <div ref={el => (this.mapContainer = el)} className="map" />
        </div>
        <button onClick={this.setLayer("temp", "temp_new")}>Temp</button>
        <button onClick={this.setLayer("clouds", "clouds_new")}>Clouds</button>
        <button onClick={this.setLayer("rain", "precipitation_new")}>
          Rain
        </button>
        <button onClick={this.setLayer("wind", "wind_new")}>wind</button>
        <WeatherContainer mapCord={this.state} />
      </div>
    );
  }
}

export default MapContainer;
