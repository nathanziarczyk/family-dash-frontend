import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Grid,
  Typography,
  makeStyles,
  TextField,
  Container,
  Button,
  CircularProgress,
} from "@material-ui/core";

import { loginUser } from "./../../data/user";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: "0 1em",
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  title: {
    color: theme.palette.secondary.main,
    paddingTop: theme.spacing(5),
  },
  subtitle: {
    color: theme.palette.secondary.main,
  },
  loginForm: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  welcomeBack: {
    textAlign: "center",
    color: theme.palette.secondary.main,
    marginBottom: theme.spacing(2),
  },
  famdash: {
    position: "absolute",
    top: 0,
    left: theme.spacing(2),
  },
  notchedOutline: {
    borderColor: theme.palette.secondary.main,
  },
  inputField: {
    color: theme.palette.secondary.main,
  },
}));

export default function Login() {
  const classes = useStyles();
  const [email, setEmail] = useState("admin");
  const [password, setPassword] = useState("test");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const loginError = useSelector((state) => state.user.login.error);
  const loading = useSelector((state) => state.user.login.loading);
  const submitHandler = (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      setError("All fields are required");
    } else {
      dispatch(loginUser(email, password));
    }
  };
  return (
    <>
      <div className={classes.famdash}>
        <Typography className={classes.title} variant="h3" component="h1">
          FamilyDash
        </Typography>
        <Typography className={classes.subtitle} variant="subtitle1">
          Improve communication with the people you love most
        </Typography>
      </div>
      <Grid container direction="column" className={classes.container}>
        <Grid item container xs={12} sm={10} direction="column">
          <Grid item xs={12} className={classes.loginForm}>
            <Typography
              className={classes.welcomeBack}
              variant="h4"
              component="h2"
            >
              Welcome Back!
            </Typography>
            <Container component="main" maxWidth="xs">
              <div>
                {loginError.bool && (
                  <Typography color="error">{loginError.msg}</Typography>
                )}
                {error !== "" && <Typography color="error">{error}</Typography>}
                <form onSubmit={submitHandler}>
                  <TextField
                    InputProps={{
                      classes: {
                        notchedOutline: classes.notchedOutline,
                        input: classes.inputField,
                      },
                    }}
                    color="secondary"
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
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
                    color="secondary"
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
                    color="secondary"
                  >
                    {loading && (
                      <CircularProgress color="secondary" size="1.8em" />
                    )}
                    {!loading && "Sign In"}
                  </Button>
                </form>
              </div>
            </Container>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
