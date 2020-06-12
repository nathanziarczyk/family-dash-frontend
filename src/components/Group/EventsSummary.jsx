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
    background: theme.palette.primary.dark,
    marginTop: 0,
  },
  titleText: {
    color: "white",
  },
  spaceBetween: {
    display: "flex",
    justifyContent: "space-between",
  },
  list: {
    position: "relative",
    height: "85.8%",
    paddingTop: 0,
  },
  floatingButton: {
    position: "absolute",
    right: "20px",
    top: "-5px",
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

  // LOADING STATE GEGROEPEERD VOOR CONDITIONAL RENDERING
  const loadingGlob = addedLoading || loading || groupLoading || editedLoading;
  const notLoadingAndEmpty =
    !loading &&
    !groupLoading &&
    !editedLoading &&
    !addedLoading &&
    upcoming.length <= 0;
  const notLoadingAndNotEmpty =
    !loading &&
    !groupLoading &&
    !addedLoading &&
    !editedLoading &&
    upcoming.length > 0;

  // SKELETON LOADING
  const skeleton = [];
  for (let i = 0; i < 3; i++) {
    skeleton.push(
      <ListItem key={`skeleton${i}`}>
        <ListItemText
          primary={<Skeleton width={mobile ? 300 : 400} />}
          secondary={<Skeleton width={mobile ? 200 : 200} />}
        />
      </ListItem>
    );
  }

  // BEPALEN HOEVEEL ITEMS PER PAGINA WORDEN WEERGEGEVEN
  // OP BASIS VAN DE SCHERMGROOTTE
  const itemsPerPage = Math.ceil(window.innerHeight * 0.01);

  return (
    <>
      <List dense className={classes.list}>
        <ListItem className={!mobile ? classes.title : ""}>
          <ListItemText
            className={
              alignCenter === true ? classes.centerText : classes.spaceBetween
            }
          >
            <Link to="/calendar">
              <Typography
                variant="h5"
                className={!mobile ? classes.titleText : ""}
              >
                Upcoming events
              </Typography>
            </Link>
          </ListItemText>
        </ListItem>

        {notLoadingAndEmpty ? (
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
          {loadingGlob && skeleton.map((item) => item)}
          {mobile &&
            (notLoadingAndEmpty ? (
              <IconButton
                color="primary"
                onClick={() => setAddEventOpen(true)}
                className={classes.floatingButton}
              >
                <AddCircleIcon fontSize="large" />
              </IconButton>
            ) : (
              ""
            ))}
          {notLoadingAndNotEmpty
            ? upcoming.map((event, index) => {
                let attending = false;
                let owner = false;
                event.attendants.filter((attendant) => {
                  if (attendant.id === currentUserId) attending = true;
                  return null;
                });
                if (new Date(event.start) <= new Date()) return null;
                if (index > itemsPerPage) return null;
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
        (notLoadingAndNotEmpty ? (
          <div className={classes.addButtonContainer}>
            <IconButton color="primary" onClick={() => setAddEventOpen(true)}>
              <AddCircleIcon fontSize="large" />
            </IconButton>
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
