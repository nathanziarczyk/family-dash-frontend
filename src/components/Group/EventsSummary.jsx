import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  makeStyles,
  IconButton,
  LinearProgress,
  Button,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import HomeIcon from "@material-ui/icons/Home";

import axios from "../../axios";
import { searchEvents } from "../../data/events";
import EventListItem from "./EventListItem";

const useStyles = makeStyles((theme) => ({
  centerText: { textAlign: "center" },
  centerContainer: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

export default function EventsSummary({ alignCenter, mobile }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const currentUserId = useSelector((state) => state.user.user.id);
  const { events, loading } = useSelector((state) => state.events);
  const groupId = useSelector((state) => state.group.id);

  const handleAttending = (eventId, type) => {
    //TODO: ID RECHTREEKS UIT RESPONSE
    //TODO: CUSTOM HOOK VAN MAKEN
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
    <>
      {loading && <LinearProgress />}
      <List dense style={{ height: "80%" }}>
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
        {!loading && events.length === 0 ? (
          <div className={classes.centerContainer}>
            <Typography variant="subtitle2" align="center">
              You have no events yet! {/* TODO: juiste link*/} <br />
              <Button color="primary">Create event</Button>
            </Typography>
          </div>
        ) : (
          ""
        )}
        {!loading && events.length > 0
          ? events.map((event, index) => {
              let attending = false;
              event.attendants.filter((attendant) => {
                if (attendant.id === currentUserId) attending = true;
                return null;
              });
              if (index > 8) return null;
              return (
                <EventListItem
                  key={event["@id"]}
                  event={event}
                  attending={attending}
                  handleAttending={handleAttending}
                />
              );
            })
          : ""}
      </List>
    </>
  );
}
