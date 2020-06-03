import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  makeStyles,
  Button,
  IconButton,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import AddCircleIcon from "@material-ui/icons/AddCircle";

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
  title: {
    position: "absolute",
    top: "-15px",
    left: "5px",
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
    width: "97%",
  },
}));

export default function EventsSummary({ alignCenter, mobile, groupLoading }) {
  const classes = useStyles();

  // ID VAN INGELOGDE GEBRUIKER EN VAN DE GROEP
  const currentUserId = useSelector((state) => state.user.user.id);
  const currentGroupId = useSelector((state) => state.group.id);

  // EVENTS EN LOADING UIT STORE
  const { upcoming, loading } = useSelector((state) => state.events);

  // STATE VOOR MODALS ADD EN EDIT EVENT
  const [addEventOpen, setAddEventOpen] = useState(false);
  const [addedLoading, setAddedLoading] = useState(false);
  const [editedLoading, setEditedLoading] = useState(false);

  // SKELETON LOADING
  const skeleton = [];
  for (let i = 0; i < 3; i++) {
    skeleton.push(
      <ListItem key={`skeleton${i}`}>
        <ListItemText
          primary={<Skeleton width={400} />}
          secondary={<Skeleton width={200} />}
        />
      </ListItem>
    );
  }
  return (
    <>
      <List dense style={{ height: "85%", position: "relative" }}>
        {mobile ? (
          <ListItem>
            <ListItemText
              className={alignCenter === true ? classes.centerText : ""}
            >
              <Typography variant="h5">Upcoming events</Typography>
              <Link to="/calendar" className="underlined">
                <Typography variant="subtitle2">All events</Typography>
              </Link>
            </ListItemText>
          </ListItem>
        ) : (
          <div className={classes.title}>
            <Typography variant="h5" style={{ flexGrow: 1 }}>
              Upcoming events
            </Typography>
            <Link to="/calendar" className="underlined">
              <Typography variant="subtitle2">All events</Typography>
            </Link>
          </div>
        )}
        {addedLoading || loading || groupLoading || editedLoading
          ? skeleton.map((item) => item)
          : ""}
        {!loading &&
        !groupLoading &&
        !editedLoading &&
        !addedLoading &&
        upcoming.length === 0 ? (
          <div className={classes.centerContainer}>
            <Typography variant="subtitle2" align="center">
              There are no upcoming events <br />
              <Button color="primary" onClick={() => setAddEventOpen(true)}>
                Create event
              </Button>
            </Typography>
          </div>
        ) : (
          ""
        )}
        <div style={{ marginTop: "1em" }}>
          {mobile &&
            (!loading &&
            !groupLoading &&
            !addedLoading &&
            !editedLoading &&
            upcoming.length > 0 ? (
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
          {!loading &&
          !groupLoading &&
          !addedLoading &&
          !editedLoading &&
          upcoming.length > 0
            ? upcoming.map((event, index) => {
                let attending = false;
                let owner = false;
                event.attendants.filter((attendant) => {
                  if (attendant.id === currentUserId) attending = true;
                  return null;
                });
                if (new Date(event.start) <= new Date()) return null;
                if (index > 7) return null;
                if (event.user.id === currentUserId) owner = true;
                return (
                  <EventListItem
                    key={event.id}
                    event={event}
                    attending={attending}
                    owner={owner}
                    groupId={currentGroupId}
                    setEditedLoading={setEditedLoading}
                  />
                );
              })
            : ""}
        </div>
      </List>
      {!mobile &&
        (!loading &&
        !groupLoading &&
        !addedLoading &&
        !editedLoading &&
        upcoming.length > 0 ? (
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
