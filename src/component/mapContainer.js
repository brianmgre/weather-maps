import React, { Component } from "react";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import WeatherContainer from "./weatherContainer";
import LayerForm from "./forms/layerForm";

import withStyles from "@material-ui/core/styles/withStyles";
import { styles } from "./styles/mapContainerStyle";
import "./styles/map.css";

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
      zoom: 1.5,
      checkA: false,
      checkB: false,
      checkC: false,
      checkD: false,
      checkE: false,
      checkF: false,
      checkG: false,
      showFiveDay: false,
      showHourly: false
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

    this.map.on("move", () => {
      this.setState({
        zoom: this.map.getZoom().toFixed(2)
      });
    });

    this.map.on("click", e => {
      this.map.flyTo({ center: e.lngLat, zoom: 8 });

      this.setState({
        lng: e.lngLat.lng.toFixed(2),
        lat: e.lngLat.lat.toFixed(2)
      });
    });

    this.map.addControl(geocoder);
    geocoder.on("result", e => {
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
    } else if (!this.map.getSource(element) && mapType !== "sat") {
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
    } else if (!this.map.getSource(element) && mapType === "sat") {
      this.map.addSource(element, {
        type: "raster",
        tiles: [
          `http://sat.owm.io/sql/{z}/{x}/{y}?from=s2&APPID=${weatherKey}`
        ],
        tileSize: 256
      });
      this.map.addLayer({
        id: element,
        type: "raster",
        source: element,
        minzoom: 5,
        maxzoom: 22,
        layout: {
          visibility: "visible"
        }
      });
    }
  };

  changeHandler = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  toggleHourly = () => {
    this.setState({ showHourly: !this.state.showHourly });
  };

  toggleCurrentWeather = () => {
    this.setState({
      showFiveDay: !this.state.showFiveDay
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={this.state.showFiveDay ? classes.rootTwo : classes.root}>
        <div className={classes.maps}>
          <div ref={el => (this.mapContainer = el)} className="map" />
        </div>
        <div
          className={
            this.state.showFiveDay ? classes.grow : classes.Weatherbuttons
          }
        >
          <LayerForm
            setLayer={this.setLayer}
            checkA={this.state.checkA}
            checkB={this.state.checkB}
            checkC={this.state.checkC}
            checkD={this.state.checkD}
            checkE={this.state.checkG}
            zoom={this.state.zoom}
            changeHandler={this.changeHandler}
          />
          <WeatherContainer
            mapCord={this.state}
            allState={this.state}
            toggleCurrentWeather={this.toggleCurrentWeather}
            changeHandler={this.changeHandler}
            toggleHourly={this.toggleHourly}
          />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(MapContainer);
