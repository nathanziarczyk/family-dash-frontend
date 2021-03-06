import React from "react";
import { makeStyles, Grid, Paper, Typography, Button } from "@material-ui/core";
import { Link } from "react-router-dom";

import { formatDate } from "../../helpers/formatDate";

const useStyles = makeStyles((theme) => ({
  gridItem: {
    height: "200px",
  },
  gridItemMobile: {
    height: window.innerHeight / 4.5,
    marginBottom: "1em",
  },
  paper: {
    height: "100%",
    padding: theme.spacing(1),
    position: "relative",
  },
  shortBody: {
    marginTop: theme.spacing(1),
    "& p": {
      display: "inline",
    },
  },
  button: {
    position: "absolute",
    bottom: theme.spacing(1),
    right: theme.spacing(1),
  },
}));

export default function NoteGridItem({ note, mobile }) {
  const classes = useStyles();

  return (
    <>
      <Grid
        item
        xs={12}
        md={4}
        className={mobile ? classes.gridItemMobile : classes.gridItem}
      >
        <Paper className={classes.paper} elevation={1}>
          <Typography variant="subtitle2" style={{ fontWeight: "lighter" }}>
            {formatDate(note.created)}
          </Typography>
          <Typography variant="h6">{note.title}</Typography>
          <Typography
            variant="body2"
            className={classes.shortBody}
            dangerouslySetInnerHTML={{ __html: note.shortBody }}
          />
          <Link to={`/note/${note.id}`}>
            <Button className={classes.button}>Read more...</Button>
          </Link>
        </Paper>
      </Grid>
    </>
  );
}
