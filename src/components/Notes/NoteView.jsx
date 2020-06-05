import React from "react";
import { Typography } from "@material-ui/core";

import { formatDate } from "../../helpers/formatDate";

export default function NotesView({ note, user }) {
  return (
    <>
      <Typography variant="subtitle2" style={{ fontWeight: "lighter" }}>
        {formatDate(note.created)}
      </Typography>
      <Typography variant="h6">{note.title}</Typography>{" "}
      <Typography variant="subtitle2" style={{ fontWeight: "lighter" }}>
        By: {user.firstName}
      </Typography>
      <Typography
        variant="body2"
        dangerouslySetInnerHTML={{ __html: note.body }}
      />
    </>
  );
}
