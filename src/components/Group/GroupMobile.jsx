import React, { useState } from "react";
import {
  makeStyles,
  Paper,
  Grid,
  BottomNavigation,
  BottomNavigationAction,
} from "@material-ui/core";
import EventIcon from "@material-ui/icons/Event";
import NoteIcon from "@material-ui/icons/Note";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";

import EventsSummary from "./EventsSummary";
import NotesSummary from "./NotesSummary";
import ShoppingListsSummary from "./ShoppingListsSummary";

const useStyles = makeStyles((theme) => ({
  paper: {
    height: "92%",
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

  // STATE VOOR TABS BOTTOM NAV
  const [value, setValue] = useState(0);

  // DATA UIT PROPS HALEN
  const { mobile, loading } = props;

  return (
    <Grid item xs={12}>
      {value === 0 && (
        <Paper className={classes.paper} elevation={0}>
          <EventsSummary
            mobile={mobile}
            groupLoading={loading}
            alignCenter={true}
          />
        </Paper>
      )}

      {value === 1 && (
        <Paper className={classes.paper} elevation={0}>
          <ShoppingListsSummary mobile={mobile} alignCenter={true} />
        </Paper>
      )}

      {value === 2 && (
        <Paper className={classes.paper} elevation={0}>
          <NotesSummary
            mobile={mobile}
            groupLoading={loading}
            alignCenter={true}
          />
        </Paper>
      )}

      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels
        className={classes.root}
      >
        <BottomNavigationAction label="Events" icon={<EventIcon />} />
        <BottomNavigationAction
          label="Shopping Lists"
          icon={<ShoppingBasketIcon />}
        />
        <BottomNavigationAction label="Notes" icon={<NoteIcon />} />
      </BottomNavigation>
    </Grid>
  );
}
