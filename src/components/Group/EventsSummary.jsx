import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  makeStyles,
} from "@material-ui/core";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  centerText: { textAlign: "center" },
  centerContainer: {
    width: "100%",

    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

export default function EventsSummary({ events, alignCenter }) {
  const classes = useStyles();
  return (
    <List>
      <ListItem>
        <ListItemText
          className={alignCenter === true ? classes.centerText : ""}
        >
          <Typography variant="h5">Upcoming events</Typography>
          <Typography variant="subtitle2">Show all</Typography>
        </ListItemText>
      </ListItem>
      {events.length === 0 && (
        <div className={classes.centerContainer}>
          <Typography variant="subtitle2">Nothing to see here</Typography>
        </div>
      )}
      {events.length > 0 &&
        events.map((event, index) => {
          if (index > 5) return null;
          return (
            <ListItem button>
              <ListItemText
                primary={event.title}
                secondary={moment(event.start).format("LLL")}
              />
            </ListItem>
          );
        })}
    </List>
  );
}
