import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  makeStyles,
  Grid,
  Button,
  IconButton,
} from "@material-ui/core";
import AddNoteModal from "../ReUsable/AddNoteModal";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import NoteListItem from "./NoteListItem";
import AddCircleIcon from "@material-ui/icons/AddCircle";

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
}));

export default function NotesSummary({ alignCenter, mobile, groupLoading }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const { notes, loading, error } = useSelector((state) => state.notes);
  console.log(groupLoading);
  return (
    <>
      <List dense style={{ position: "relative" }}>
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
      </List>
      <Grid
        item
        container
        spacing={1}
        xs={12}
        style={{ height: mobile ? "70%" : "97%" }}
      >
        {notes.map((note, i) => {
          if (i > 2) return null;
          return (
            <Grid item xs={12} sm={6}>
              <NoteListItem
                note={note}
                groupLoading={loading}
                mobile={mobile}
              />
            </Grid>
          );
        })}
      </Grid>
      <AddNoteModal open={open} setOpen={setOpen} />
    </>
  );
}
