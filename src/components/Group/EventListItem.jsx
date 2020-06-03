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
import { useHistory } from "react-router-dom";
import { deleteEvent } from "../../helpers/deleteEvent";
import { searchEvents } from "../../data/events";

export default function EventListItem({
  event,
  owner,
  groupId,
  setEditedLoading,
}) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleDeleteClick = (e, eventId) => {
    e.preventDefault();
    deleteEvent(eventId).then((response) => dispatch(searchEvents(groupId)));
  };

  const handleEditClick = (e, event) => {
    setOpen(true);
  };
  return (
    <>
      <ListItem
        key={event.id}
        button
        onClick={() => history.push(`/event/${event.id}`)}
      >
        <ListItemText
          primary={event.title}
          secondary={formatDate(event.start)}
        />
        {owner && (
          <ListItemSecondaryAction>
            <IconButton onClick={(e) => handleEditClick(e, event)}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={(e) => handleDeleteClick(e, event.id)}>
              <DeleteSweepIcon />
            </IconButton>
          </ListItemSecondaryAction>
        )}
      </ListItem>
      <EditEventModal
        open={open}
        setOpen={setOpen}
        event={event}
        setEditedLoading={setEditedLoading}
      />
    </>
  );
}
