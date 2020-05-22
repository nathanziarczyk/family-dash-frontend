import React, { useEffect, useState } from "react";
import {
  Grid,
  List,
  Paper,
  makeStyles,
  Typography,
  CircularProgress,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

import { getGroups } from "./../../data/groups";
import GroupListItem from "./GroupListItem";
import InvitationListItem from "./InvitationListItem";

const useStyles = makeStyles((theme) => ({
  flexContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  paper: {
    width: "100%",
    minHeight: "30em",
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
}));

export default function Overview() {
  const dispatch = useDispatch();
  const [showGroups, setShowGroups] = useState(true);
  const [showInvitations, setShowInvitations] = useState(false);
  const { loading, error, groups, invitations } = useSelector(
    (state) => state.groups
  );
  const classes = useStyles();
  useEffect(() => {
    dispatch(getGroups());
  }, []);
  return (
    <>
      <Grid item xs={false} sm={3} />
      <Grid item xs={12} sm={6} className={classes.flexContainer}>
        <div>
          <Typography
            onClick={() => {
              setShowGroups(true);
              setShowInvitations(false);
            }}
            className={showGroups ? classes.active : classes.notActive}
          >
            Your Groups
          </Typography>
          <Typography
            onClick={() => {
              setShowGroups(false);
              setShowInvitations(true);
            }}
            className={showInvitations ? classes.active : classes.notActive}
          >
            Your Invitations
          </Typography>
        </div>
        <Paper elevation={3} className={classes.paper}>
          {showGroups && (
            <List dense>
              {!loading &&
                groups.length > 0 &&
                groups.map((group) => {
                  return (
                    <GroupListItem
                      key={group.id}
                      groupName={group.name}
                      groupId={group.id}
                      groupMembers={group.groupMembers}
                    />
                  );
                })}
              {!loading && groups.length === 0 && (
                <ListItem>
                  <ListItemText primary="You have no groups" />
                </ListItem>
              )}
              {loading && <CircularProgress color="secondary" size="1.8em" />}
            </List>
          )}
          {showInvitations && (
            <List dense>
              {!loading &&
                invitations.length > 0 &&
                invitations.map((group) => {
                  return (
                    <InvitationListItem
                      key={group.id}
                      groupName={group.name}
                      groupId={group.id}
                      groupMembers={group.groupMembers}
                    />
                  );
                })}
              {!loading && invitations.length === 0 && (
                <ListItem>
                  <ListItemText primary="You have no invitations" />
                </ListItem>
              )}
              {loading && <CircularProgress color="secondary" size="1.8em" />}
            </List>
          )}
        </Paper>
      </Grid>
      <Grid item xs={false} sm={3} />
    </>
  );
}
