import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const Navbar = props => {
  return (
    <AppBar>
      <Toolbar>
        <Typography variant="h3">World Weather</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
