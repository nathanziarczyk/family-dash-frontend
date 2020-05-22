import React from "react";
import { Grid, makeStyles, Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  bigPaper: {
    height: "95%",
    width: "95%",
  },
  smallPaper: {
    height: "90%",
    width: "95%",
  },
  gridContainer: {
    height: "100%",
  },
}));

export default function Group() {
  const classes = useStyles();
  return (
    <Grid container className={classes.gridContainer}>
      <Grid item xs={1} />
      <Grid item container xs={12} sm={5}>
        <Grid item container alignItems="center" xs={12}>
          <Paper className={classes.bigPaper} elevation={3}></Paper>
        </Grid>
      </Grid>
      <Grid item container xs={12} sm={5}>
        <Grid item container alignItems="center" xs={12}>
          <Paper className={classes.smallPaper} elevation={3}></Paper>
        </Grid>
        <Grid item container alignItems="center" xs={12}>
          <Paper className={classes.smallPaper} elevation={3}></Paper>
        </Grid>
      </Grid>
      <Grid item xs={1} />
    </Grid>
  );
}
