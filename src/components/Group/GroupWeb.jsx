import React from "react";
import { Grid, makeStyles, Paper } from "@material-ui/core";

import EventsSummary from "./EventsSummary";
import NotesSummary from "./NotesSummary";
import ShoppingListsSummary from "./ShoppingListsSummary";

const useStyles = makeStyles((theme) => ({
  bigPaper: {
    height: "95%",
    width: "95%",
  },
  smallPaper: {
    height: "42vh",
    width: "95%",
  },
}));

// GROEP WEERGAVE OP WEB
export default function GroupWeb(props) {
  const classes = useStyles();
  const { loading } = props;
  return (
    <>
      <Grid item xs={1} />
      <Grid item container xs={12} sm={5}>
        <Grid item container alignItems="center" justify="center" xs={12}>
          <Paper className={classes.bigPaper}>
            <EventsSummary groupLoading={loading} />
          </Paper>
        </Grid>
      </Grid>
      <Grid item container xs={12} sm={5}>
        <Grid item container alignItems="center" justify="center" xs={12}>
          <Paper className={classes.smallPaper}>
            <ShoppingListsSummary groupLoading={loading} />
          </Paper>
        </Grid>
        <Grid item container alignItems="center" justify="center" xs={12}>
          <Paper className={classes.smallPaper}>
            <NotesSummary groupLoading={loading} />
          </Paper>
        </Grid>
      </Grid>
      <Grid item xs={1} />
    </>
  );
}
