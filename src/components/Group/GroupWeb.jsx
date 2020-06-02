import React from "react";
import { Grid, makeStyles, Paper, Card } from "@material-ui/core";

import EventsSummary from "./EventsSummary";
import NotesSummary from "./NotesSummary";
import ShoppingListsSummary from "./ShoppingListsSummary";

const useStyles = makeStyles((theme) => ({
  bigPaper: {
    height: "95%",
    width: "95%",
  },
  smallPaper: {
    height: "38vh",
    width: "95%",
  },
  red: {
    background: "red",
  },
}));

export default function GroupWeb(props) {
  const classes = useStyles();
  const { loading } = props;
  return (
    <>
      <Grid item xs={1} />
      <Grid item container xs={12} sm={5}>
        <Grid item container alignItems="center" justify="center" xs={12}>
          <Paper className={classes.bigPaper} elevation={3}>
            <EventsSummary groupLoading={loading} />
          </Paper>
        </Grid>
      </Grid>
      <Grid item container xs={12} sm={5}>
        <Grid item container alignItems="center" justify="center" xs={12}>
          <Paper className={classes.smallPaper} elevation={3}>
            <ShoppingListsSummary />
          </Paper>
        </Grid>
        <Grid item container alignItems="center" justify="center" xs={12}>
          <Paper className={classes.smallPaper} elevation={3}>
            <NotesSummary groupLoading={loading} />
          </Paper>
        </Grid>
      </Grid>
      <Grid item xs={1} />
    </>
  );
}
