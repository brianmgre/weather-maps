import React, { Component } from "react";
import mapboxgl from "mapbox-gl";
import "./styles/map.css";
import WeatherContainer from "./weatherContainer";

mapboxgl.accessToken = process.env.REACT_APP_MAP_API;

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

    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/mapbox/streets-v9",
      center: [lng, lat],
      zoom
    });

    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true
      })
    );

    map.on("click", e => {
      map.flyTo({ center: e.lngLat, zoom: 8 });
      console.log(e.lngLat);
      this.hi(e.lngLat);

      this.setState({
        lng: e.lngLat.lng.toFixed(4),
        lat: e.lngLat.lat.toFixed(4)
      });
    });
  }

  hi = info => {
    console.log(info);
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
      </div>
    );
  }
}

export default MapContainer;
