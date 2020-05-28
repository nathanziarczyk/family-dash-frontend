import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  makeStyles,
  FormControlLabel,
  Checkbox,
  IconButton,
} from "@material-ui/core";
import moment from "moment";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import HomeIcon from "@material-ui/icons/Home";

import axios from "../../axios";
import { searchEvents } from "../../data/events";

const useStyles = makeStyles((theme) => ({
  centerText: { textAlign: "center" },
  centerContainer: {
    width: "100%",

    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

export default function EventsSummary({ alignCenter, mobile }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const currentUserId = useSelector((state) => state.user.user.id);
  const events = useSelector((state) => state.events.events);
  const groupId = useSelector((state) => state.group.id);

  const handleAttending = (eventId, type) => {
    const arr = eventId.split("/");
    const id = arr[arr.length - 1];
    if (type === "remove") {
      axios
        .put(`/events/${id}`, {
          removeAttendant: `/api/users/${currentUserId}`,
        })
        .then((response) => {
          dispatch(searchEvents(groupId));
        })
        .catch((error) => console.log(error.response));
    } else {
      axios
        .put(`/events/${id}`, {
          newAttendant: `/api/users/${currentUserId}`,
        })
        .then((response) => {
          dispatch(searchEvents(groupId));
        })
        .catch((error) => console.log(error.response));
    }
  };

  return (
    <List dense>
      <ListItem style={{ position: "relative" }}>
        <ListItemText
          className={alignCenter === true ? classes.centerText : ""}
        >
          {mobile && (
            <Link to="/">
              <div style={{ position: "absolute", top: 2, left: 10 }}>
                <IconButton style={{}}>
                  <HomeIcon />
                </IconButton>
              </div>
            </Link>
          )}
          <Typography variant="h5">Upcoming events</Typography>
          <Typography variant="subtitle2">Show all</Typography>
        </ListItemText>
      </ListItem>
      {events.length === 0 && (
        <div className={classes.centerContainer}>
          <Typography variant="subtitle2">
            You have no events yet! {/* TODO: juiste link*/}
            <Link to="/">Create event</Link>
          </Typography>
        </div>
      )}
      {events.length > 0 &&
        events.map((event, index) => {
          let attending = false;
          event.attendants.filter((attendant) => {
            if (attendant.id === currentUserId) attending = true;
          });
          if (index > 8) return null;
          return (
            <ListItem key={event["@id"]} button>
              <ListItemText
                primary={event.title}
                secondary={moment(event.start).format("LLL")}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={attending}
                    onClick={() => {
                      if (attending) handleAttending(event["@id"], "remove");
                      if (!attending) handleAttending(event["@id"], "add");
                    }}
                    name="checkedB"
                    color="primary"
                  />
                }
                label={attending ? "Going" : "Not going"}
              />
            </ListItem>
          );
        })}
    </List>
  );
}
