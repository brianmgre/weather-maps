export const styles = theme => ({
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 80,
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "center"
    }
  },

  Weatherbuttons: {
    display: "flex",
    flexDirection: "column",
    width: "40%",
    alignItems: "center"
  },

  maps: {
    width: "60%"
  },

  rootTwo: {
    display: "flex",
    flexDirection: "column-reverse",
    alignItems: "center",
    marginTop: 80
  },

  grow: {
    width: "100%",
    textAlign: "center"
  }
});
