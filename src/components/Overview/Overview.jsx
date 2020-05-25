import React, { useEffect, useState } from "react";
import {
  Grid,
  Paper,
  makeStyles,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

import { getGroups } from "../../data/groups";
import NewGroupForm from "./NewGroupForm";
import InvitationList from "./InvitationList";
import GroupList from "./GroupList";

const useStyles = makeStyles((theme) => ({
  flexContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "100%",
  },
  paper: {
    width: "100%",
    height: "90%",
    overflow: "auto",
  },
  notActive: {
    display: "inline",
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.primary.main,
    width: "20%",
    padding: ".4em",
    borderTopLeftRadius: "5px",
    borderTopRightRadius: "5px",
    cursor: "pointer",
    marginRight: ".4em",
  },
  active: {
    display: "inline",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.secondary.light,
    marginRight: ".4em",
    width: "20%",
    padding: ".4em",
    zIndex: 2000,
    borderTopLeftRadius: "5px",
    borderTopRightRadius: "5px",
    cursor: "pointer",
  },
  center: {
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

export default function Overview() {
  const dispatch = useDispatch();
  const classes = useStyles();

  // STATE VOOR TABS
  const [showGroups, setShowGroups] = useState(true);
  const [showInvitations, setShowInvitations] = useState(false);
  const [showNewGroup, setShowNewGroup] = useState(false);

  // GROUP DATA UIT REDUX STORE HALEN
  const { loading, error, groups, invitations, newGroupMessage } = useSelector(
    (state) => state.groups
  );

  // ELKE KEER GERENDERD WORDT 1 KEER UITVOEREN
  // OM GROUPDATA OP TE HALEN OBV USER (JWT)
  useEffect(() => {
    dispatch(getGroups());
  }, [dispatch]);

  return (
    <>
      <Grid item xs={false} sm={3} />
      <Grid item xs={12} sm={6} className={classes.flexContainer}>
        <div>
          <Typography
            onClick={() => {
              setShowGroups(true);
              setShowInvitations(false);
              setShowNewGroup(false);
            }}
            className={showGroups ? classes.active : classes.notActive}
          >
            Your Groups
          </Typography>
          <Typography
            onClick={() => {
              setShowInvitations(true);
              setShowGroups(false);
              setShowNewGroup(false);
            }}
            className={showInvitations ? classes.active : classes.notActive}
          >
            Your Invitations
          </Typography>
          <Typography
            onClick={() => {
              setShowNewGroup(true);
              setShowInvitations(false);
              setShowGroups(false);
            }}
            className={showNewGroup ? classes.active : classes.notActive}
          >
            +
          </Typography>
        </div>
        <Paper elevation={3} className={classes.paper}>
          {loading && (
            <div className={classes.center}>
              <CircularProgress />
            </div>
          )}
          {error.bool && (
            <div className={classes.center}>
              <Typography variant="subtitle2">{error.message}</Typography>
            </div>
          )}

          {error.bool ? (
            ""
          ) : (
            <>
              {showGroups && (
                <GroupList groups={groups} loading={loading} error={error} />
              )}
              {showInvitations && (
                <InvitationList
                  invitations={invitations}
                  loading={loading}
                  error={error}
                />
              )}
              {showNewGroup && (
                <NewGroupForm
                  loading={loading}
                  error={error}
                  newGroupMessage={newGroupMessage}
                />
              )}
            </>
          )}
        </Paper>
      </Grid>
      <Grid item xs={false} sm={3} />
    </>
  );
}
