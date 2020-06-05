import React, { useState, useEffect } from "react";
import {
  Grid,
  Paper,
  makeStyles,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import { useSelector } from "react-redux";
import NoteGridItem from "./NoteGridItem";
import Pagination from "@material-ui/lab/Pagination";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  paper: {
    height: "90%",
    width: "100%",
    position: "relative",
    padding: ".5em .5em 0 .5em",
  },
  gridItem: {
    display: "flex",
    alignItems: "center",
  },
  pagination: {
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    bottom: "15px",
    left: "50%",
    transform: "translateX(-50%)",
    width: "100%",
  },
  gridContainer: {},
}));

export default function Notes() {
  const { notes, loading } = useSelector((state) => state.notes);
  const classes = useStyles();
  const [pageNotes, setPageNotes] = useState([]);
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    getNotes(1);
  }, [mobile]);

  const itemsPerPage = mobile ? 3 : 9;

  const getNotes = (page) => {
    const minItems = (page - 1) * itemsPerPage + 1;
    const maxItems = page * itemsPerPage;
    const pageNotesArr = notes.filter((note, i) => {
      const index = i + 1;
      if (index >= minItems && index <= maxItems) {
        return note;
      }
      return null;
    });
    setPageNotes(pageNotesArr);
  };

  const handlePagination = (e, value) => {
    getNotes(value);
  };

  return (
    <>
      <Grid item xs={1} sm={2} />
      <Grid item xs={10} sm={8} className={classes.gridItem}>
        <Paper
          elevation={1}
          className={clsx(classes.paper, "blend")}
          elevation={0}
        >
          <Grid container spacing={3}>
            {pageNotes.map((note) => (
              <NoteGridItem note={note} />
            ))}
          </Grid>
          <Pagination
            className={classes.pagination}
            count={Math.ceil(notes.length / itemsPerPage)}
            onChange={handlePagination}
          />
        </Paper>
      </Grid>
      <Grid item xs={1} sm={2} />
    </>
  );
}
