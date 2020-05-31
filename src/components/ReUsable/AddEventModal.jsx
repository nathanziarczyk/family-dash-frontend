import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import { TextField, Grid, useMediaQuery } from "@material-ui/core";
import { DateTimePicker } from "@material-ui/pickers";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet-async";

import { searchEvents } from "../../data/events";
import { createEvent } from "../../helpers/createEvent";
import ErrorMessage from "../Messages/ErrorMessage";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  form: {
    paddingTop: theme.spacing(2),
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddEventModal({ open, setOpen, setAddedLoading }) {
  const currentGroup = useSelector((state) => state.group.id);
  const classes = useStyles();
  const [selectedStartDate, handleStartDateChange] = useState(new Date());
  const [selectedEndDate, handleEndDateChange] = useState(new Date());
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));

  // INPUT ERRORS
  const [descriptionError, setDescriptionError] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const createEventHandler = async (e) => {
    e.preventDefault();
    setAddedLoading(true);
    const start = selectedStartDate.toISOString();
    const end = selectedEndDate.toISOString();
    if (title.length === 0) {
      setTitleError(true);
      return null;
    }
    if (description.length === 0) {
      setDescriptionError(true);
      return null;
    }
    if (start > end) return null;
    createEvent(title, description, start, end, currentGroup).then(async () => {
      console.log(currentGroup);
      await dispatch(searchEvents(currentGroup));
      setAddedLoading(false);
    });
    setOpen(false);
  };

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            New Event
          </Typography>
          <Button autoFocus color="inherit" onClick={createEventHandler}>
            save
          </Button>
        </Toolbar>
      </AppBar>
      <form className={classes.form} onSubmit={createEventHandler}>
        <Grid container spacing={2}>
          <Grid container item xs={12}>
            <Grid item xs={false} sm={4} />
            <Grid item xs={12} sm={4} style={{ textAlign: "center" }}>
              <Typography variant="h6">Create a new event</Typography>
            </Grid>
            <Grid item xs={false} sm={4} />
          </Grid>
          <Grid container item xs={12}>
            <Grid item xs={false} sm={4} />
            <Grid item xs={12} sm={4}>
              <TextField
                color="primary"
                error={titleError}
                fullWidth={true}
                size="small"
                id="title"
                label="Title*"
                placeholder="Title*"
                multiline
                variant="outlined"
                value={title}
                onChange={(e) => {
                  setTitleError(false);
                  setTitle(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={false} sm={4} />
          </Grid>
          <Grid container item xs={12}>
            <Grid item xs={false} sm={4} />
            <Grid item xs={12} sm={4}>
              <TextField
                error={descriptionError}
                color="primary"
                fullWidth={true}
                size="medium"
                id="description"
                label="Description*"
                placeholder="Description*"
                multiline
                variant="outlined"
                multiline={true}
                value={description}
                onChange={(e) => {
                  setDescriptionError(false);
                  setDescription(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={false} sm={4} />
          </Grid>
          <Grid container item xs={12}>
            <Grid item xs={false} sm={4} />
            <Grid container item xs={12} sm={4}>
              <Grid item spacing={1} xs={6}>
                <DateTimePicker
                  color="primary"
                  value={selectedStartDate}
                  disablePast
                  onChange={handleStartDateChange}
                  label="From*"
                  showTodayButton
                  inputVariant="outlined"
                  fullWidth={true}
                />
              </Grid>
              <Grid item xs={6}>
                <DateTimePicker
                  color="primary"
                  value={selectedEndDate}
                  disablePast
                  onChange={handleEndDateChange}
                  label="Until*"
                  showTodayButton
                  inputVariant="outlined"
                  minDate={selectedStartDate}
                  minDateMessage="Pick a date after start date"
                  fullWidth={true}
                />
              </Grid>
            </Grid>
            <Grid item xs={false} sm={4} />
          </Grid>
          <Grid container item xs={12}>
            <Grid item xs={false} sm={4} />
            <Grid item xs={12} sm={4} style={{ textAlign: "center" }}>
              {mobile ? (
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  color="primary"
                  style={{ borderRadius: 0 }}
                >
                  create event
                </Button>
              ) : (
                <Button type="submit" variant="contained" color="primary">
                  create event
                </Button>
              )}
            </Grid>
            <Grid item xs={false} sm={4} />
          </Grid>
        </Grid>
      </form>
      {titleError || descriptionError ? (
        <ErrorMessage message="Fill in all fields" />
      ) : (
        ""
      )}
    </Dialog>
  );
}
