import React, { useState } from "react";
import {
  ListItem,
  ListItemText,
  FormControlLabel,
  Checkbox,
  Typography,
  ListItemSecondaryAction,
  Button,
} from "@material-ui/core";
import EventDialog from "../ReUsable/EventDialog";

import { formatDate } from "../../helpers/formatDate";

export default function EventListItem({ event, attending, handleAttending }) {
  const [open, setOpen] = useState(false);
  const type = attending ? "remove" : "add";
  return (
    <>
      <ListItem key={event["@id"]} button onClick={() => setOpen(true)}>
        <ListItemText
          primary={event.title}
          secondary={formatDate(event.start)}
        />
        <ListItemSecondaryAction>
          <Button
            color="primary"
            onClick={() => handleAttending(event["@id"], type)}
          >
            {attending ? "You're going!" : "You're not going"}
          </Button>
        </ListItemSecondaryAction>
      </ListItem>
      <EventDialog
        open={open}
        setOpen={setOpen}
        event={event}
        attending={attending}
        handleAttending={handleAttending}
      />
    </>
  );
}
