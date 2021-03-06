import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Grid } from "@material-ui/core";

import Login from "./Login";
import Register from "./Register";
import ErrorMessage from "../Messages/ErrorMessage";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  loginPaper: {
    width: "100%",
    height: "100vh",
    margin: 0,
    padding: 0,
    backgroundColor: theme.palette.primary.main,
    borderRadius: 0,
  },
}));

export default function LoginRegister() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!localStorage.getItem("refresh-counter")) {
      localStorage.setItem("refresh-counter", 0);
    }
    if (Number.parseInt(localStorage.getItem("refresh-counter")) === 0) {
      window.location.reload();
      localStorage.setItem("refresh-counter", 1);
    }
    if (
      localStorage.getItem("expired-token") &&
      Number.parseInt(localStorage.getItem("refresh-counter")) !== 0
    )
      setOpen(true);
    return () => {
      localStorage.setItem("refresh-counter", 0);
      localStorage.removeItem("expired-token");
    };
  }, []);
  return (
    <>
      <Grid container spacing={0}>
        <Grid item xs={false} sm={12} md={6}>
          <Paper className={classes.loginPaper} elevation={0}>
            <Login id="login" />
          </Paper>
        </Grid>
        <Grid item xs={false} sm={12} md={6}>
          <Paper elevation={0}>
            <Register id="register" />
          </Paper>
        </Grid>
      </Grid>
      {open && <ErrorMessage message="Te lang" />}
    </>
  );
}
