import React from "react";
import { Grid, Paper, makeStyles } from "@material-ui/core";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  paper: {
    height: "90%",
    width: "100%",
  },
  gridItem: {
    display: "flex",
    alignItems: "center",
  },
}));

export default function Notes() {
  const { notes } = useSelector((state) => state.notes);
  const classes = useStyles();
  console.log(notes);
  return (
    <>
      <Grid item xs={false} sm={2} />
      <Grid item xs={12} sm={8} className={classes.gridItem}>
        <Paper elevation={1} className={classes.paper}>
          <Grid container>
            <Grid item xs={1} sm={3}></Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={false} sm={2} />
    </>
  );
}
