import React, { useEffect, useState } from "react";
import {
  Grid,
  Paper,
  makeStyles,
  Typography,
  Badge,
  useTheme,
  useMediaQuery,
  List,
  ListItem,
  ListItemText,
  AppBar,
  Tabs,
  Tab,
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
  const [value, setValue] = useState(0);
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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Helmet>
        <title>{loading ? "Loading" : "FamilyDash — overview"}</title>
      </Helmet>
      <Grid item xs={false} sm={3} />
      <Grid item xs={12} sm={6} className={classes.flexContainer}>
        <AppBar position="static" color="transparent" elevation={1}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            centered
          >
            <Tab value={0} label="Groups" wrapped />
            <Tab value={1} label="Invitations" wrapped />
            <Tab value={2} label="New group" wrapped />
          </Tabs>
        </AppBar>
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
              {value === 0 && (
                <GroupList groups={groups} loading={loading} error={error} />
              )}
              {value === 1 && (
                <InvitationList
                  invitations={invitations}
                  loading={loading}
                  error={error}
                />
              )}
              {value === 2 && (
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
