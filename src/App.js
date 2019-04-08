import React, { Component } from "react";
import "./App.css";
import MapContainer from "./component/mapContainer";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    secondary: {
      main: "#ffffff"
    }
  },
  primary: {
    main: "#11591c"
  }
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <MapContainer />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
