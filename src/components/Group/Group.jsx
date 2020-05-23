import React, { useEffect } from "react";
import { Grid, makeStyles, CircularProgress } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";

import { loadGroup } from "../../data/group";
import GroupWeb from "./GroupWeb";

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    height: "100%",
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
            <GroupWeb events={events} />
          </>
        )}
      </Grid>
    </>
  );
}
