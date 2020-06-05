import React, { useState, useEffect } from "react";
import {
  Grid,
  Paper,
  makeStyles,
  Typography,
  IconButton,
} from "@material-ui/core";
import DeleteSweepIcon from "@material-ui/icons/DeleteSweep";
import EditIcon from "@material-ui/icons/Edit";
import Skeleton from "react-loading-skeleton";

import axios from "../../axios";
import { useSelector } from "react-redux";
import NoteView from "./NoteView";
import NoteEdit from "./NoteEdit";
import ConfirmDialog from "../ReUsable/ConfirmDialog";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    height: "auto",
    width: "100%",
    padding: theme.spacing(2),
  },
  paperMobile: {
    height: "100% !important",
  },
  gridItem: {
    display: "flex",
    alignItems: "center",
  },
}));

export default function NoteDetail({ props }) {
  const history = useHistory();

  // Loading state voor het ophalen van de note
  const [loading, setLoading] = useState(false);

  // State voor note en aanmaker van note
  const [note, setNote] = useState({});
  const [user, setUser] = useState({});

  // State voor het bepalen of edit mode aan staat
  const [edit, setEdit] = useState(false);

  // State voor de confirm dialog verwijderen
  const [confirm, setConfirm] = useState(false);
  // Id van aangemelde user uit state halen
  const currentUserId = useSelector((state) => state.user.user.id);

  const handleDeleteNote = () => {
    axios
      .delete(`/notes/${id}`)
      .then(async (response) => await history.goBack());
  };

  const classes = useStyles();

  // Na het laden van pagina de note ophalen adhv querystring id
  useEffect(() => {
    setLoading(true);
    axios
      .get(`notes/${id}`)
      .then((response) => {
        setNote(response.data);
        setUser(response.data.user);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, [edit]);
  const id = props.match.params.id;

  return (
    <Grid container>
      <Grid item xs={false} sm={3} />
      <Grid item xs={12} sm={6} className={classes.gridItem}>
        <Paper className={classes.paper}>
          {loading && (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Skeleton width={100} />
              <Skeleton width={130} />
              <Skeleton width={80} />
              <Skeleton width={500} />
              <Skeleton width={500} />
            </div>
          )}
          {!loading && !edit && <NoteView note={note} user={user} />}
          {!loading && edit && (
            <NoteEdit note={note} id={id} setEdit={setEdit} />
          )}
          {user.id === currentUserId && !edit && (
            <div className={classes.icons}>
              <IconButton onClick={(e) => setEdit(true)}>
                <EditIcon color="primary" />
              </IconButton>
              <IconButton onClick={(e) => setConfirm(true)}>
                <DeleteSweepIcon color="primary" />
              </IconButton>
            </div>
          )}
        </Paper>
        <ConfirmDialog
          title="Are you sure you want to delete this note?"
          open={confirm}
          setOpen={setConfirm}
          onConfirm={handleDeleteNote}
        ></ConfirmDialog>
      </Grid>
      <Grid item xs={false} sm={3} />
    </Grid>
  );
}
