import React, { useState, useEffect } from "react";
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

import { searchEvents } from "../../data/events";
import { editEvent } from "../../helpers/editEvent";
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
  input: {
    padding: "0 .8em",
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddEventModal({
  open,
  setOpen,
  setEditedLoading,
  event,
}) {
  const currentGroup = useSelector((state) => state.group.id);
  const classes = useStyles();
  const [selectedStartDate, handleStartDateChange] = useState(
    new Date(event.start)
  );
  const [selectedEndDate, handleEndDateChange] = useState(new Date(event.end));
  const [title, setTitle] = useState(event.title);
  const [description, setDescription] = useState(event.description);
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));

  // INPUT ERRORS
  const [descriptionError, setDescriptionError] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    handleStartDateChange(new Date(event.start));
    handleEndDateChange(new Date(event.end));
  }, [event.start, event.end]);

  const handleClose = () => {
    setOpen(false);
  };

  const createEventHandler = async (e) => {
    e.preventDefault();
    setEditedLoading(true);
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
    editEvent(title, description, start, end, event.id).then(async () => {
      await dispatch(searchEvents(currentGroup));
      setEditedLoading(false);
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
            Edit Event
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
              <Typography variant="h6">Edit event</Typography>
            </Grid>
            <Grid item xs={false} sm={4} />
          </Grid>
          <Grid container item xs={12}>
            <Grid item xs={false} sm={4} />
            <Grid item xs={12} sm={4} className={mobile && classes.input}>
              <TextField
                color="primary"
                error={titleError}
                fullWidth={true}
                size="small"
                id="title"
                label="Title*"
                placeholder="Title*"
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
            <Grid item xs={12} sm={4} className={mobile && classes.input}>
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
            <Grid
              container
              item
              xs={12}
              sm={4}
              className={mobile && classes.input}
            >
              <Grid item xs={6}>
                <DateTimePicker
                  color="primary"
                  value={selectedStartDate}
                  disablePast
                  onChange={(e) => {
                    handleStartDateChange(e);
                    const dt = new Date(e);
                    dt.setHours(dt.getHours() + 1);
                    handleEndDateChange(dt);
                  }}
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
                  edit event
                </Button>
              ) : (
                <Button type="submit" variant="contained" color="primary">
                  edit event
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
