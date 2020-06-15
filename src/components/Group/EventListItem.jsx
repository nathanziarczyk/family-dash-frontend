import React, { useState } from "react";
import {
  ListItem,
  ListItemText,
  IconButton,
  ListItemSecondaryAction,
} from "@material-ui/core";
import DeleteSweepIcon from "@material-ui/icons/DeleteSweep";
import EditIcon from "@material-ui/icons/Edit";
import { useDispatch } from "react-redux";

import EditEventModal from "../ReUsable/EditEventModal";
import { formatDate } from "../../helpers/formatDate";
import { Link } from "react-router-dom";
import { deleteEvent } from "../../data/events";

export default function EventListItem({ event, owner, groupId }) {
  const dispatch = useDispatch();

  // OPEN STATE VOOR EDIT MODAL
  const [open, setOpen] = useState(false);

  // EVENT VERWIJDEREN
  const handleDeleteClick = (e, eventId) => {
    e.preventDefault();
    dispatch(deleteEvent(eventId, groupId));
  };

  return (
    <>
      <ListItem
        key={event.id}
        button
        component={Link}
        to={`/event/${event.id}`}
      >
        <ListItemText
          primary={event.title}
          secondary={formatDate(event.start)}
        />
        {owner && (
          <ListItemSecondaryAction>
            <IconButton onClick={(e) => setOpen(true)}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={(e) => handleDeleteClick(e, event.id)}>
              <DeleteSweepIcon />
            </IconButton>
          </ListItemSecondaryAction>
        )}
      </ListItem>
      <EditEventModal open={open} setOpen={setOpen} event={event} />
    </>
  );
}
