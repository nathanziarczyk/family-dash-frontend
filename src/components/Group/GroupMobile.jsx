import React from "react";
import { makeStyles, Paper, Grid, IconButton } from "@material-ui/core";
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
  carouselContainer: {},
}));

export default function GroupMobile(props) {
  const classes = useStyles();

  // EVENTS DATA UIT PROPS HALEN
  const { events, mobile } = props;

  return (
    <Grid item xs={12} className={classes.carouselContainer}>
      <Carousel
        autoPlay={false}
        style={{ height: "100%" }}
        navButtonsAlwaysVisible={true}
        indicators={false}
        fullHeightHover={false}
        timeout={200}
      >
        <Paper className={classes.paper} elevation={0}>
          <EventsSummary mobile={mobile} events={events} alignCenter={true} />
        </Paper>
        <Paper className={classes.paper} elevation={0}>
          <ShoppingListsSummary mobile={mobile} alignCenter={true} />
        </Paper>
        <Paper className={classes.paper} elevation={0}>
          <NotesSummary mobile={mobile} alignCenter={true} />
        </Paper>
      </Carousel>
    </Grid>
  );
}
