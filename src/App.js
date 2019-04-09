import React, { Component } from "react";
import "./App.css";
import MapContainer from "./component/mapContainer";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import { styles } from "./component/styles/appStyle";
import NavBar from "./component/navBar";

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    secondary: {
      main: "#11591c"
    }
  },
  primary: {
    main: "#11591c"
  }
});

class App extends Component {
  render() {
    const { classes } = this.props;
    return (
      <MuiThemeProvider theme={theme}>
        <div className={classes.root}>
          <div>
            <NavBar />
          </div>
          <MapContainer />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(App);
