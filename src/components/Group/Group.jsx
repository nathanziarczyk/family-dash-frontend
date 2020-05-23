import React, { useEffect } from "react";
import {
  Grid,
  makeStyles,
  CircularProgress,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";

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
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = useStyles();
  const { name, loading, error, events } = useSelector((state) => state.group);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadGroup(groupId));
  }, []);

  const groupId = props.match.params.id;

  return (
    <>
      <Grid container className={classes.gridContainer}>
        {loading ? (
          <div className={classes.loadingDiv}>
            <CircularProgress color="primary" />
          </div>
        ) : (
          <>
            {!mobile && <GroupWeb events={events} />}
            {mobile && <GroupMobile events={events} />}
          </>
        )}
      </Grid>
    </>
  );
}
