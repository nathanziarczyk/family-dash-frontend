import React, { useState } from "react";
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
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import { useDispatch } from "react-redux";
import * as EmailValidator from "email-validator";

// import { registerUser } from "./../../data/user";
import { registerUser } from "../../helpers/register";
import ErrorMessage from "../Messages/ErrorMessage";
import SuccessMessage from "../Messages/SuccessMessage";
import { succesRegister } from "../../data/user";

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
    position: "relative",
  },
  inputField: {
    color: theme.palette.primary.main,
  },
  notchedOutline: {
    borderColor: theme.palette.primary.main,
  },
  fab: {
    position: "absolute",
    top: "30px",
    left: "50%",
    transform: "translateX(-50%)",
  },
}));

export default function Register() {
  const classes = useStyles();
  const dispatch = useDispatch();

  // VOLGENS MATERIAL UI THEME BREAKPOINTS BEPALEN
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));

  // INPUTFIELDS STATE
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [message, setMessage] = useState(false);
  const [loading, setLoading] = useState(false);

  // ERROR STATE
  const [inputError, setInputError] = useState("");

  // LOADING EN ERROR AXIOS
  // const error = useSelector((state) => state.user.register.error);
  // const loading = useSelector((state) => state.user.register.loading);

  // FORM SUBMIT HANDLER
  const submitHandler = (e) => {
    e.preventDefault();
    // setInputError(
    //   "Register is disabled while i'm developing the app :) patience :)"
    // );
    // return null;
    //TODO: Register terug aanzetten (setInputError & return null weghalen)
    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      password === ""
    ) {
      setInputError("All register fields are required");
      return null;
    }
    if (!EmailValidator.validate(email)) {
      setInputError("Email is not valid");
      return null;
    }
    setLoading(true);
    registerUser(email, password, firstName, lastName)
      .then((response) => {
        setLoading(false);
        dispatch(succesRegister);
        setMessage(
          "Account created! Check your mailbox to activate your account."
        );
      })
      .catch((error) => {
        setLoading(false);
        if (error.response === undefined) {
          setMessage(
            "Account created! Check your mailbox to activate your account."
          );
        } else {
          if (error.response.data.error === "Duplicate entry for email")
            setError("User with this email already exists");
          else setError("Something went wrong, please try again");
        }
      });
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
              <form onSubmit={submitHandler} id="register">
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
                  fullWidth
                  label="First Name"
                  value={firstName}
                  onChange={(e) => {
                    setInputError("");
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
                  fullWidth
                  label="Last Name"
                  value={lastName}
                  onChange={(e) => {
                    setInputError("");
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
                  fullWidth
                  label="Email Address"
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
                  color="primary"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  label="Password"
                  type="password"
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
                  color="primary"
                >
                  {loading ? (
                    <CircularProgress color="primary" size="1.8em" />
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </form>
            </div>
            {mobile && (
              <Fab
                href="#login"
                className={classes.fab}
                color="primary"
                variant="extended"
              >
                <ExpandLessIcon color="inherit" />
                Login
              </Fab>
            )}
          </Container>
        </Grid>
      </Grid>
      {message.length > 0 && (
        <SuccessMessage clearError={setMessage} message={message} />
      )}
      {error.length > 0 && (
        <ErrorMessage clearError={setError} message={error} />
      )}
      {inputError !== "" && (
        <ErrorMessage message={inputError} clearError={setInputError} />
      )}
    </Grid>
  );
}
