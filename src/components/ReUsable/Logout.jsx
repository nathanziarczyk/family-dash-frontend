import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "./../../data/user";
import { useHistory } from "react-router-dom";
import { CircularProgress, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  full: {
    background: theme.palette.primary.main,
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  colorPrimary: {
    color: "white",
  },
}));

export default function Logout() {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  useEffect(() => {
    setTimeout(() => {
      dispatch(logoutUser());
    }, 500);
  }, [dispatch, history]);
  return (
    <div className={classes.full}>
      <CircularProgress className={classes.colorPrimary} color="inherit" />
    </div>
  );
}
