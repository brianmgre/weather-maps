import React from "react";

import { styles } from "../styles/formStyle";
import withStyles from "@material-ui/core/styles/withStyles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const LayerForm = props => {
  const { classes } = props;

  return (
    <form className={classes.root}>
      <FormControlLabel
        control={
          <Checkbox
            checked={props.checkA}
            onChange={props.changeHandler("checkA")}
            value="checkA"
            name="checkA"
            color="secondary"
            onClick={props.setLayer("temp", "temp_new")}
          />
        }
        label={<span className={classes.formLabel}>Temp</span>}
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={props.checkB}
            onChange={props.changeHandler("checkB")}
            value="CheckB"
            name="checkB"
            color="secondary"
            onClick={props.setLayer("clouds", "clouds_new")}
          />
        }
        label={<span className={classes.formLabel}>Clouds</span>}
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={props.checkC}
            onChange={props.changeHandler("checkC")}
            value="CheckC"
            name="checkC"
            color="secondary"
            onClick={props.setLayer("rain", "precipitation_new")}
          />
        }
        label={<span className={classes.formLabel}>Precipitation</span>}
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={props.checkD}
            onChange={props.changeHandler("checkD")}
            value="CheckD"
            name="checkD"
            color="secondary"
            onClick={props.setLayer("wind", "wind_new")}
          />
        }
        label={<span className={classes.formLabel}>Wind</span>}
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={props.checkG}
            onChange={props.changeHandler("checkG")}
            value="CheckG"
            name="checkG"
            color="secondary"
            onClick={props.setLayer("sat", "sat")}
          />
        }
        className={props.zoom >= 5 ? classes.show : classes.hidden}
        label={<span className={classes.formLabel}>Satellite</span>}
      />
    </form>
  );
};

export default withStyles(styles)(LayerForm);
