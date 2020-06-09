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
import Pagination from "@material-ui/lab/Pagination";
import clsx from "clsx";

import NoteGridItem from "./NoteGridItem";
import { searchNotes } from "../../data/notes";
import AddNoteModal from "../ReUsable/AddNoteModal";

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
  const dispatch = useDispatch();
  const classes = useStyles();
  const theme = useTheme();

  const mobile = useMediaQuery(theme.breakpoints.down("sm"));

  // STATE VOOR PAGINATION
  const [page, setPage] = useState(1);

  // STATE VOOR MODAL
  const [open, setOpen] = useState(false);
  const [addedLoading, setAddedLoading] = useState(false);

  const { notes, loading } = useSelector((state) => state.notes);
  const groupId = useSelector((state) => state.group.id);

  useEffect(() => {
    dispatch(searchNotes(groupId));
  }, [dispatch, groupId]);

  // Hoeveel items er per pagina worden weergegeven
  // 3 op mobile, 9 op web
  const itemsPerPage = mobile ? 3 : 9;

  // Bepalen welke items op de pagina worden weergegeven
  const minItems = (page - 1) * itemsPerPage;
  const maxItems = page * itemsPerPage - 1;

  // Als de pagina veranderd
  const handlePagination = (e, value) => {
    setPage(value);
  };

  return (
    <>
      <Grid item xs={1} sm={2} />
      <Grid item xs={10} sm={8} className={classes.gridItem}>
        <Paper elevation={0} className={clsx(classes.paper, "blend")}>
          <Grid container spacing={3} style={{ maxHeight: "100%" }}>
            {notes.length > 0 ? (
              notes.map((note, i) => {
                if (i >= minItems && i <= maxItems)
                  return <NoteGridItem key={note.id} note={note} />;
                else return null;
              })
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
          {notes.length > 0 && (
            <Pagination
              className={classes.pagination}
              count={Math.ceil(notes.length / itemsPerPage)}
              onChange={handlePagination}
            />
          )}
        </Paper>
      </Grid>
      <AddNoteModal
        open={open}
        setOpen={setOpen}
        setAddedLoading={setAddedLoading}
      />
      <Grid item xs={1} sm={2} />
    </>
  );
}
