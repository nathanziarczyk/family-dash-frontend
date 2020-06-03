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
    position: "absolute",
    top: "-15px",
    left: "5px",
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
    width: "97%",
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
}));

export default function NotesSummary({ alignCenter, mobile, groupLoading }) {
  const classes = useStyles();

  // OPEN STATE VOOR ADD NOTE MODAL
  const [open, setOpen] = useState(false);

  // NOTES, LOADING & ERROR UIT STORE
  const { notes, loading } = useSelector((state) => state.notes);

  //
  const [addedLoading, setAddedLoading] = useState(false);

  // SKELETON LOADING
  const skeleton = [];
  for (let i = 0; i < 3; i++) {
    skeleton.push(
      <ListItem key={`skeleton${i}`}>
        <ListItemText
          primary={<Skeleton width={400} />}
          secondary={<Skeleton width={200} />}
        />
      </ListItem>
    );
  }
  return (
    <>
      <List dense style={{ position: "relative", height: "70%" }}>
        {mobile ? (
          <>
            <ListItem>
              <ListItemText
                className={alignCenter === true ? classes.centerText : ""}
              >
                <Typography variant="h5">Notes</Typography>
                <Link to="/notes" className="underlined">
                  <Typography variant="subtitle2">All notes</Typography>
                </Link>
              </ListItemText>
            </ListItem>
            <IconButton
              color="primary"
              onClick={() => setOpen(true)}
              style={{ position: "absolute", right: "20px", top: "3px" }}
            >
              <AddCircleIcon fontSize="large" />
            </IconButton>
          </>
        ) : (
          <div className={classes.title}>
            <Typography
              variant="h5"
              style={{ flexGrow: 1 }}
              onClick={() => setOpen(true)}
            >
              Notes
            </Typography>
            <Link to="/notes" className="underlined">
              <Typography variant="subtitle2">All notes</Typography>
            </Link>
          </div>
        )}
        {!loading && !groupLoading && !addedLoading && notes.length <= 0 && (
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
          {!loading && !groupLoading && !addedLoading && notes.length > 0 && (
            <>
              {notes.map((note, i) => {
                if (i > 2) return null;
                return (
                  <NoteListItem
                    note={note}
                    groupLoading={loading}
                    mobile={mobile}
                  />
                );
              })}
            </>
          )}
          {loading || groupLoading || addedLoading
            ? skeleton.map((e) => e)
            : ""}
        </div>
      </List>
      {!loading &&
        !groupLoading &&
        !addedLoading &&
        !mobile &&
        notes.length > 0 && (
          <div className={classes.addButtonContainer}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setOpen(true)}
            >
              Add note
            </Button>
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
