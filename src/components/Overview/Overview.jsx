import React, { useEffect, useState } from "react";
import {
  Grid,
  Paper,
  makeStyles,
  Typography,
  CircularProgress,
  Badge,
  useTheme,
  useMediaQuery,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

import { getGroups } from "../../data/groups";
import NewGroupForm from "./NewGroupForm";
import InvitationList from "./InvitationList";
import GroupList from "./GroupList";
import { Helmet } from "react-helmet-async";
import Skeleton from "react-loading-skeleton";

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
    width: "100%",
    padding: ".4em",
    borderTopLeftRadius: "5px",
    borderTopRightRadius: "5px",
    cursor: "pointer",
  },
  active: {
    display: "inline",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.secondary.light,
    width: "100%",
    padding: ".4em",
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
  badge: {
    marginRight: "1em",
  },
  mobileTabs: {
    display: "flex",
    justifyContent: "center",
    borderBottom: `1px solid ${theme.palette.primary.main}`,
    width: "100%",
  },
}));

export default function Overview() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));

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
      <Helmet>
        <title>{loading ? "Loading" : "FamilyDash — overview"}</title>
      </Helmet>
      <Grid item xs={false} sm={3} />
      <Grid item xs={12} sm={6} className={classes.flexContainer}>
        <div className={mobile ? classes.mobileTabs : ""}>
          <Badge className={classes.badge}>
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
          </Badge>
          <Badge
            badgeContent={invitations.length}
            color="error"
            invisible={invitations.length === 0}
            className={classes.badge}
          >
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
          </Badge>
          <Badge className={classes.badge}>
            <Typography
              onClick={() => {
                setShowNewGroup(true);
                setShowInvitations(false);
                setShowGroups(false);
              }}
              className={showNewGroup ? classes.active : classes.notActive}
            >
              <AddCircleOutlineIcon fontSize="small" />
            </Typography>
          </Badge>
        </div>
        <Paper elevation={mobile ? 0 : 3} className={classes.paper}>
          {loading && (
            <List>
              <ListItem>
                <ListItemText>
                  <Skeleton />
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText>
                  <Skeleton />
                </ListItemText>
              </ListItem>
            </List>
          )}
          {!loading && error.bool ? (
            <div className={classes.center}>
              <Typography variant="subtitle2">{error.message}</Typography>
            </div>
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
