import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  makeStyles,
} from "@material-ui/core";
import AddNoteModal from "../ReUsable/AddNoteModal";

const useStyles = makeStyles((theme) => ({
  centerText: { textAlign: "center" },
}));

export default function NotesSummary({ alignCenter, mobile }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  return (
    <>
      <List>
        <ListItem style={{ position: "relative" }}>
          <ListItemText
            className={alignCenter === true ? classes.centerText : ""}
          >
            <Typography variant="h5" onClick={() => setOpen(true)}>
              Notes
            </Typography>
            <Typography variant="subtitle2">Show all</Typography>
          </ListItemText>
        </ListItem>
      </List>
      <AddNoteModal open={open} setOpen={setOpen} />
    </>
  );
}
