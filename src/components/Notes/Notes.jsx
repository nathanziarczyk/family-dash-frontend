import React, { useState, useEffect } from "react";
import {
  Grid,
  Paper,
  makeStyles,
  useTheme,
  useMediaQuery,
  Typography,
  Button,
  IconButton,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import Pagination from "@material-ui/lab/Pagination";
import clsx from "clsx";
import AddCircleIcon from "@material-ui/icons/AddCircle";

import NoteGridItem from "./NoteGridItem";
import { searchNotes } from "../../data/notes";
import AddNoteModal from "../ReUsable/AddNoteModal";

const useStyles = makeStyles((theme) => ({
  paper: {
    height: "99%",
    width: "100%",
    position: "relative",
  },
  pagination: {
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    bottom: "2px",
    left: "50%",
    transform: "translateX(-50%)",
    width: "100%",
  },
  centerText: {
    width: "100%",
    height: "300px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    background: theme.palette.primary.dark,
    display: "flex",
    alignItems: "center",
    height: "50px",
    padding: "0 1em",
    marginBottom: ".5em",
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
      <Grid item xs={false} sm={2} />
      <Grid item xs={12} sm={8} className={classes.gridItem}>
        <Paper elevation={0} className={clsx(classes.paper, "blend")}>
          <div className={classes.title}>
            <Typography style={{ color: "white", flex: 1 }}>Notes</Typography>
            <IconButton onClick={setOpen} style={{ color: "white" }}>
              <AddCircleIcon />
            </IconButton>
          </div>
          <Grid container spacing={mobile ? 0 : 3}>
            {notes.length > 0 ? (
              notes.map((note, i) => {
                if (i >= minItems && i <= maxItems)
                  return (
                    <NoteGridItem mobile={mobile} key={note.id} note={note} />
                  );
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
      <Grid item xs={false} sm={2} />
    </>
  );
}
