import React from "react";
import { ListItem, ListItemText } from "@material-ui/core";

import { formatDate } from "../../helpers/formatDate";

export default function NoteListItem({ note, groupLoading, mobile }) {
  return (
    <ListItem button>
      <ListItemText
        primary={`${note.title} - by ${"naam hier"}`}
        secondary={`${formatDate(note.created)}`}
      />
    </ListItem>
  );
}
