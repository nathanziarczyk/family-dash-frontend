import React from "react";
import { makeStyles, Paper, Grid } from "@material-ui/core";
import Carousel from "react-material-ui-carousel";

import EventsSummary from "./EventsSummary";
import NotesSummary from "./NotesSummary";
import ShoppingListsSummary from "./ShoppingListsSummary";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: "1em",
    height: "100%",
    width: "100%",
  },
  container: {
    height: "95%",
    width: "100%",
  },
}));

export default function GroupMobile(props) {
  const classes = useStyles();
  const { events } = props;

  return (
    <Grid item xs={12}>
      <Carousel
        autoPlay={false}
        style={{ height: "90%" }}
        navButtonsAlwaysVisible={true}
        indicators={false}
        fullHeightHover={false}
        timeout={200}
      >
        <Paper className={classes.paper} elevation={0}>
          <EventsSummary events={events} alignCenter={true} />
        </Paper>
        <Paper className={classes.paper} elevation={0}>
          <ShoppingListsSummary alignCenter={true} />
        </Paper>
        <Paper className={classes.paper} elevation={0}>
          <NotesSummary alignCenter={true} />
        </Paper>
      </Carousel>
    </Grid>
  );
}
