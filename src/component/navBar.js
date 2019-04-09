import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { styles } from "./styles/navBarStyle";
import withStyles from "@material-ui/core/styles/withStyles";

const Navbar = props => {
  const { classes } = props;

  return (
    <AppBar className={classes.root}>
      <Toolbar className={classes.toolbar}>
        <Typography variant="h3" className={classes.logoText}>
          World Weather
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default withStyles(styles)(Navbar);
