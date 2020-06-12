import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  makeStyles,
  Button,
  IconButton,
} from "@material-ui/core";
import AddNoteModal from "../ReUsable/AddNoteModal";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import NoteListItem from "./NoteListItem";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Skeleton from "react-loading-skeleton";

const useStyles = makeStyles((theme) => ({
  centerText: { textAlign: "center" },
  title: {
    background: theme.palette.primary.dark,
  },
  list: {
    height: "70%",
    paddingTop: 0,
    position: "relative",
  },
  titleText: {
    color: "white",
  },
  addButtonContainer: {
    width: "100%",
    textAlign: "center",
  },
  centerContainer: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  floatingButton: {
    position: "absolute",
    right: "20px",
    top: "-5px",
  },
}));

export default function NotesSummary({ alignCenter, mobile, groupLoading }) {
  const classes = useStyles();

  // OPEN STATE VOOR ADD NOTE MODAL
  const [open, setOpen] = useState(false);

  // NOTES, LOADING & ERROR UIT STORE
  const { notes, loading } = useSelector((state) => state.notes);

  // LOADING STATE NA TOEVOEGEN
  const [addedLoading, setAddedLoading] = useState(false);

  // LOADING STATE GEBUNDELD VOOR CONDITIONAL RENDERING
  const loadingGlob = loading || groupLoading || addedLoading;
  const notLoadingAndNotEmpty =
    !loading && !groupLoading && !addedLoading && notes.length > 0;
  const notLoadingAndEmpty =
    !loading && !groupLoading && !addedLoading && notes.length <= 0;

  // SKELETON LOADING
  const skeleton = [];
  for (let i = 0; i < 2; i++) {
    skeleton.push(
      <ListItem key={`skeleton${i}`}>
        <ListItemText
          primary={<Skeleton width={400} />}
          secondary={<Skeleton width={200} />}
        />
      </ListItem>
    );
  }

  // HOEVEEL ITEMS PER PAGINA WORDEN WEERGEGEVEN OP BASIS VAN SCHERMGROOTTE
  const itemsPerPage = mobile ? Math.ceil(window.innerHeight * 0.01) : 2;

  return (
    <>
      <List dense className={classes.list}>
        <ListItem key={"title"} className={!mobile ? classes.title : ""}>
          <ListItemText
            className={alignCenter === true ? classes.centerText : ""}
          >
            <Link to="/notes">
              <Typography
                variant="h5"
                className={!mobile ? classes.titleText : ""}
              >
                Notes
              </Typography>
            </Link>
          </ListItemText>
        </ListItem>
        {mobile && (
          <IconButton
            color="primary"
            onClick={() => setOpen(true)}
            className={classes.floatingButton}
          >
            <AddCircleIcon fontSize="large" />
          </IconButton>
        )}
        {notLoadingAndEmpty && (
          <div className={classes.centerContainer}>
            <Typography variant="subtitle2" align="center">
              You have no notes yet! <br />
              <Button color="primary" onClick={() => setOpen(true)}>
                Create note
              </Button>
            </Typography>
          </div>
        )}
        <div style={{ marginTop: ".8em" }}>
          {notLoadingAndNotEmpty && (
            <>
              {notes.map((note, i) => {
                if (i > itemsPerPage) return null;
                return (
                  <NoteListItem
                    key={note.id}
                    note={note}
                    groupLoading={loading}
                    mobile={mobile}
                  />
                );
              })}
            </>
          )}
          {loadingGlob && skeleton.map((e) => e)}
        </div>
      </List>
      {!mobile && notLoadingAndNotEmpty && (
        <div className={classes.addButtonContainer}>
          <IconButton color="primary" onClick={() => setOpen(true)}>
            <AddCircleIcon fontSize="large" />
          </IconButton>
        </div>
      )}
      <AddNoteModal
        open={open}
        setOpen={setOpen}
        setAddedLoading={setAddedLoading}
      />
    </>
  );
}
