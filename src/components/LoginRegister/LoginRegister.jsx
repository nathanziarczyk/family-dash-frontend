import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Grid } from "@material-ui/core";

import Login from "./Login";
import Register from "./Register";

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
  window.localStorage.removeItem("persist:root");
  return (
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
  );
}
