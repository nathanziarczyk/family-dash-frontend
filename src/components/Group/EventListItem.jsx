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
import { useHistory } from "react-router-dom";

export default function EventListItem({ event, attending, handleAttending }) {
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const type = attending ? "remove" : "add";
  const eventArr = event["@id"].split("/");
  const eventId = eventArr[eventArr.length - 1];
  console.log(event);
  return (
    <>
      <ListItem
        key={event["@id"]}
        button
        onClick={() => history.push(`/event/${eventId}`)}
      >
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
