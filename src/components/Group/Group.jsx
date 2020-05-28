import React, { useEffect } from "react";
import {
  Grid,
  makeStyles,
  CircularProgress,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet";

import { loadGroup } from "../../data/group";
import { searchEvents } from "../../data/events";
import GroupWeb from "./GroupWeb";
import GroupMobile from "./GroupMobile";

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    height: "100%",
    maxWidth: "100vw",
  },
  loadingDiv: {
    width: "100%",
    heigth: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

export default function Group({ props }) {
  const dispatch = useDispatch();

  // DATA OM TE BEPALEN OF SCREENSIZE MOBILE IS OF NIET
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = useStyles();

  // GROUP EN EVENT DATA UIT REDUX STORE HALEN
  const { name, loading, error } = useSelector((state) => state.group);

  useEffect(() => {
    dispatch(loadGroup(props.match.params.id));
    // dispatch(searchEvents(props.match.params.id));
  }, [dispatch, props.match.params.id]);

  return (
    <>
      <Helmet>
        <title>FamilyDash — {name}</title>
      </Helmet>
      <Grid container className={classes.gridContainer}>
        {loading ? (
          <div className={classes.loadingDiv}>
            <CircularProgress color="primary" />
          </div>
        ) : (
          <>
            {!mobile && <GroupWeb mobile={mobile} />}
            {mobile && <GroupMobile mobile={mobile} />}
          </>
        )}
      </Grid>
    </>
  );
}
