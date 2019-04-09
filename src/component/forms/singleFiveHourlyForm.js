import React from "react";

import { styles } from "../styles/formStyle";
import withStyles from "@material-ui/core/styles/withStyles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const SingleFiveHourly = props => {
  const { classes } = props;

  return (
    <form className={classes.root}>
      <FormControlLabel
        control={
          <Checkbox
            checked={props.checkE}
            onChange={props.changeHandler("checkE")}
            value="checkE"
            name="checkE"
            color="secondary"
            onClick={props.toggleCurrentWeather}
          />
        }
        label={<span className={classes.formLabel}>5 Day Forecast</span>}
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={props.checkF}
            onChange={props.changeHandler("checkF")}
            value="checkF"
            name="checkF"
            color="secondary"
            onClick={props.toggleHourly}
          />
        }
        className={props.showFiveDay ? classes.hourlyToggle : classes.hidden}
        label={<span className={classes.formLabel}>Hourly Forecast</span>}
      />
    </form>
  );
};

export default withStyles(styles)(SingleFiveHourly);
