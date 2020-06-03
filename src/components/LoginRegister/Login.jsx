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
  useTheme,
  useMediaQuery,
  Fab,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { loginUser } from "./../../data/user";
import ErrorMessage from "../Messages/ErrorMessage";

// CSS CLASSES
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
  fab: {
    position: "absolute",
    bottom: "30px",
    left: "50%",
    transform: "translateX(-50%)",
  },
}));

export default function Login() {
  const classes = useStyles();
  const dispatch = useDispatch();

  // INPUTFIELDS STATE
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ERROR STATE
  const [inputError, setInputError] = useState("");

  // ERROR EN LOADING AXIOS CALL
  const { error, loading } = useSelector((state) => state.user.login);

  // VOLGENS MATERIAL UI THEME BREAKPOINT MOBILE BEPALEN
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));

  // LOGIN FORM SUBMIT HANDLER
  const submitHandler = (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      setInputError("All login fields are required");
      return null;
    }
    dispatch(loginUser(email, password));
  };

  return (
    <>
      <div className={classes.famdash} id="login">
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
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => {
                      setInputError("");
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
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => {
                      setInputError("");
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
              {mobile && (
                <Fab
                  href="#register"
                  className={classes.fab}
                  color="secondary"
                  variant="extended"
                >
                  <ExpandMoreIcon color="inherit" />
                  Register
                </Fab>
              )}
            </Container>
          </Grid>
        </Grid>
      </Grid>
      {error.bool && <ErrorMessage message={error.msg} />}
      {inputError !== "" && (
        <ErrorMessage
          message={inputError}
          clearError={setInputError}
          position={!mobile && "bottomLeft"}
        />
      )}
    </>
  );
}
