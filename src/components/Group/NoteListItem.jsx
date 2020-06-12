import React from "react";
import { ListItem, ListItemText } from "@material-ui/core";

import { formatDate } from "../../helpers/formatDate";
import { Link } from "react-router-dom";

export default function NoteListItem({ note }) {
  return (
    <Link to={`/note/${note.id}`}>
      <ListItem button key={note.id}>
        <ListItemText
          primary={`${note.title}`}
          secondary={`${formatDate(note.created)}`}
        />
      </ListItem>
    </Link>
  );
}
