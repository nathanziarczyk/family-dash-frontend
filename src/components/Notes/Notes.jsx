import React, { useState, useEffect } from "react";
import {
  Grid,
  Paper,
  makeStyles,
  useTheme,
  useMediaQuery,
  Typography,
  Button,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import NoteGridItem from "./NoteGridItem";
import Pagination from "@material-ui/lab/Pagination";
import clsx from "clsx";

import { searchNotes } from "../../data/notes";

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
    bottom: "-15px",
    left: "50%",
    transform: "translateX(-50%)",
    width: "100%",
  },
  centerText: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

export default function Notes() {
  const classes = useStyles();
  const [pageNotes, setPageNotes] = useState([]);
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { notes, loading } = useSelector((state) => state.notes);
  const groupId = useSelector((state) => state.group.id);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log("zoeken");
    dispatch(searchNotes(groupId));
  }, []);

  useEffect(() => {
    console.log("get");
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
          <Grid container spacing={3} style={{ maxHeight: "100%" }}>
            {pageNotes.length > 0 ? (
              pageNotes.map((note) => <NoteGridItem note={note} />)
            ) : (
              <div className={classes.centerText}>
                <Typography variant="subtitle2" align="center">
                  You have no notes yet! <br />
                  <Button color="primary" onClick={() => setOpen(true)}>
                    Create note
                  </Button>
                </Typography>
              </div>
            )}
          </Grid>
          {pageNotes.length > 0 && (
            <Pagination
              className={classes.pagination}
              count={Math.ceil(notes.length / itemsPerPage)}
              onChange={handlePagination}
            />
          )}
        </Paper>
      </Grid>
      <Grid item xs={1} sm={2} />
    </>
  );
}
