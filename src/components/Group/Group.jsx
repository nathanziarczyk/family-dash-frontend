import React, { useEffect } from "react";
import { Grid, makeStyles, useMediaQuery, useTheme } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet-async";

import { loadGroup } from "../../data/group";
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
  const { name, loading } = useSelector((state) => state.group);

  // GROUP DATA LADEN OBV URL PARAMETER (ID)
  useEffect(() => {
    dispatch(loadGroup(props.match.params.id));
  }, [dispatch, props.match.params.id]);

  return (
    <>
      <Helmet>
        <title>{loading ? "Loading" : `FamilyDash — ${name}`}</title>
      </Helmet>
      <Grid container className={classes.gridContainer}>
        <>
          {!mobile && <GroupWeb mobile={mobile} loading={loading} />}
          {mobile && <GroupMobile mobile={mobile} loading={loading} />}
        </>
      </Grid>
    </>
  );
}
