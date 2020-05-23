import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  centerText: { textAlign: "center" },
}));

export default function NotesSummary({ alignCenter }) {
  const classes = useStyles();

  return (
    <>
      <List>
        <ListItem>
          <ListItemText
            className={alignCenter === true ? classes.centerText : ""}
          >
            <Typography variant="h5">Notes</Typography>
            <Typography variant="subtitle2">Show all</Typography>
          </ListItemText>
        </ListItem>
      </List>
    </>
  );
}
