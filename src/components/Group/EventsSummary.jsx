import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  makeStyles,
  LinearProgress,
  Button,
  IconButton,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Skeleton from "react-loading-skeleton";
import AddCircleIcon from "@material-ui/icons/AddCircle";

import axios from "../../axios";
import { searchEvents } from "../../data/events";
import EventListItem from "./EventListItem";
import AddEventModal from "../ReUsable/AddEventModal";

const useStyles = makeStyles((theme) => ({
  centerText: { textAlign: "center" },
  centerContainer: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonContainer: {
    width: "100%",
    textAlign: "center",
  },
}));

export default function EventsSummary({ alignCenter, mobile, groupLoading }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const currentUserId = useSelector((state) => state.user.user.id);
  const { events, loading } = useSelector((state) => state.events);
  const groupId = useSelector((state) => state.group.id);
  const [addEventOpen, setAddEventOpen] = useState(false);
  const [addedLoading, setAddedLoading] = useState(false);

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
  const skeleton = [];
  for (let i = 0; i < 5; i++) {
    skeleton.push(
      <ListItem>
        <ListItemText primary={<Skeleton />} secondary={<Skeleton />} />
      </ListItem>
    );
  }

  return (
    <>
      <List dense style={{ height: "80%", position: "relative" }}>
        <ListItem style={{ position: "relative" }}>
          <ListItemText
            className={alignCenter === true ? classes.centerText : ""}
          >
            <Typography variant="h5">Upcoming events</Typography>
            <Link to="/calendar" className="underlined">
              <Typography variant="subtitle2">Show all</Typography>
            </Link>
          </ListItemText>
        </ListItem>
        {addedLoading || loading || groupLoading
          ? skeleton.map((item) => item)
          : ""}
        {!loading && !groupLoading && events.length === 0 ? (
          <div className={classes.centerContainer}>
            <Typography variant="subtitle2" align="center">
              You have no events yet! <br />
              <Button color="primary" onClick={() => setAddEventOpen(true)}>
                Create event
              </Button>
            </Typography>
          </div>
        ) : (
          ""
        )}
        {mobile &&
          (!loading && !groupLoading && events.length > 0 ? (
            <IconButton
              color="primary"
              onClick={() => setAddEventOpen(true)}
              style={{ position: "absolute", right: "20px", top: "3px" }}
            >
              <AddCircleIcon fontSize="large" />
            </IconButton>
          ) : (
            ""
          ))}
        {!loading && !groupLoading && events.length > 0
          ? events.map((event, index) => {
              let attending = false;
              event.attendants.filter((attendant) => {
                if (attendant.id === currentUserId) attending = true;
                return null;
              });
              if (index > 6) return null;
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
      {!mobile &&
        (!loading && !groupLoading && events.length > 0 ? (
          <div className={classes.addButtonContainer}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setAddEventOpen(true)}
            >
              Add Event
            </Button>
          </div>
        ) : (
          ""
        ))}

      <AddEventModal
        open={addEventOpen}
        setOpen={setAddEventOpen}
        setAddedLoading={setAddedLoading}
      />
    </>
  );
}
