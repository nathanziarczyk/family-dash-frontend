import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Editor } from "@tinymce/tinymce-react";
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

import ErrorMessage from "../Messages/ErrorMessage";
import { createNote } from "../../helpers/createNote";
import { getNotes } from "../../data/notes";

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
    margin: "0 .8em",
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddNoteModal({ open, setOpen, setAddedLoading }) {
  const currentGroup = useSelector((state) => state.group.id);
  const classes = useStyles();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const dispatch = useDispatch();

  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));

  // INPUT ERRORS
  const [titleError, setTitleError] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleEditorChange = (e) => {
    setBody(e);
  };
  const createNoteHandler = (e) => {
    e.preventDefault();
    setAddedLoading(true);
    if (title.length === 0) {
      setTitleError(true);
      return null;
    }
    if (body.length === 0) {
      setTitleError(true);
      return null;
    }
    createNote(title, body, currentGroup).then(async () => {
      await dispatch(getNotes(currentGroup));
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
            New Note
          </Typography>
          <Button autoFocus color="inherit" onClick={createNoteHandler}>
            save
          </Button>
        </Toolbar>
      </AppBar>
      <form className={classes.form} onSubmit={createNoteHandler}>
        <Grid container spacing={2}>
          <Grid container item xs={12}>
            <Grid item xs={false} sm={3} />
            <Grid item xs={12} sm={6} style={{ textAlign: "center" }}>
              <Typography variant="h6">Create a new note</Typography>
            </Grid>
            <Grid item xs={false} sm={3} />
          </Grid>
          <Grid container item xs={12}>
            <Grid item xs={false} sm={3} />
            <Grid item xs={12} sm={4} className={mobile ? classes.input : ""}>
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
            <Grid item xs={false} sm={5} />
          </Grid>
          <Grid container item xs={12}>
            <Grid item xs={false} sm={3} />
            <Grid item xs={12} sm={6} className={mobile ? classes.input : ""}>
              <Editor
                apiKey={process.env.REACT_APP_TINY}
                value={body}
                init={{
                  height: 300,
                  menubar: false,
                  plugins: [],
                  toolbar:
                    "undo redo  | bold italic backcolor | alignleft aligncenter | help",
                }}
                onEditorChange={(e) => handleEditorChange(e)}
              />
            </Grid>
            <Grid item xs={false} sm={3} />
          </Grid>
          <Grid container item xs={12}>
            <Grid item xs={false} sm={3} />
            <Grid item xs={12} sm={6} style={{ textAlign: "center" }}>
              {mobile ? (
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  style={{ borderRadius: 0, width: "90%" }}
                  className={classes.input}
                >
                  create note
                </Button>
              ) : (
                <Button type="submit" variant="contained" color="primary">
                  create note
                </Button>
              )}
            </Grid>
            <Grid item xs={false} sm={3} />
          </Grid>
        </Grid>
      </form>
      {titleError ? <ErrorMessage message="Fill in all the fields" /> : ""}
    </Dialog>
  );
}
