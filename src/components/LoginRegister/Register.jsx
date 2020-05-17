import React, { useState } from "react";
import {
  Grid,
  Typography,
  makeStyles,
  TextField,
  Container,
  Button,
  CircularProgress,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import * as EmailValidator from "email-validator";
import { Redirect } from "react-router-dom";

import { registerUser } from "./../../data/user";

const useStyles = makeStyles((theme) => ({
  container: {
    height: "100vh",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    color: theme.palette.primary.main,
  },
  registerForm: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  inputField: {
    color: theme.palette.primary.main,
  },
  notchedOutline: {
    borderColor: theme.palette.primary.main,
  },
}));

export default function Register() {
  const classes = useStyles();
  const [firstName, setFirstName] = useState("a");
  const [lastName, setLastName] = useState("a");
  const [email, setEmail] = useState("admin");
  const [password, setPassword] = useState("admin");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const registerError = useSelector((state) => state.user.register.error);
  const loading = useSelector((state) => state.user.register.loading);
  const submitHandler = (e) => {
    e.preventDefault();
    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      password === ""
    ) {
      setError("All fields are required");
    }
    if (!EmailValidator.validate(email)) {
      setError("Email is not valid");
    } else {
      dispatch(registerUser(firstName, lastName, email, password));
    }
  };
  return (
    <Grid container direction="column" className={classes.container}>
      <Grid item container xs={12} sm={10} direction="column">
        <Grid item xs={12} className={classes.registerForm}>
          <Typography className={classes.title} variant="h4" component="h2">
            Create Account
          </Typography>
          <Container
            component="main"
            maxWidth="xs"
            className={classes.loginForm}
          >
            <div>
              {registerError.bool && (
                <Typography color="error">{registerError.msg}</Typography>
              )}
              {error !== "" && <Typography color="error">{error}</Typography>}
              <form onSubmit={submitHandler}>
                <TextField
                  className={classes.inputField}
                  InputProps={{
                    classes: {
                      notchedOutline: classes.notchedOutline,
                      input: classes.inputField,
                    },
                  }}
                  color="primary"
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="First Name"
                  value={firstName}
                  onChange={(e) => {
                    setError("");
                    setFirstName(e.target.value);
                  }}
                />
                <TextField
                  InputProps={{
                    classes: {
                      notchedOutline: classes.notchedOutline,
                      input: classes.inputField,
                    },
                  }}
                  color="primary"
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="Last Name"
                  name="email"
                  autoComplete="email"
                  value={lastName}
                  onChange={(e) => {
                    setError("");
                    setLastName(e.target.value);
                  }}
                />
                <TextField
                  InputProps={{
                    classes: {
                      notchedOutline: classes.notchedOutline,
                      input: classes.inputField,
                    },
                  }}
                  color="primary"
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  value={email}
                  onChange={(e) => {
                    setError("");
                    setEmail(e.target.value);
                  }}
                />
                <TextField
                  InputProps={{
                    classes: {
                      notchedOutline: classes.notchedOutline,
                      input: classes.inputField,
                    },
                  }}
                  color="primary"
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => {
                    setError("");
                    setPassword(e.target.value);
                  }}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="outlined"
                  color="primary"
                >
                  {loading && <CircularProgress color="primary" size="1.8em" />}
                  {!loading && "Sign Up"}
                </Button>
              </form>
            </div>
          </Container>
        </Grid>
      </Grid>
    </Grid>
  );
}
