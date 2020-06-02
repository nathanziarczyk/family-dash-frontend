import React from "react";
import {
  ListItem,
  ListItemText,
  IconButton,
  ListItemSecondaryAction,
} from "@material-ui/core";
import DeleteSweepIcon from "@material-ui/icons/DeleteSweep";
import { useDispatch } from "react-redux";

import { formatDate } from "../../helpers/formatDate";
import { useHistory } from "react-router-dom";
import { deleteEvent } from "../../helpers/deleteEvent";
import { searchEvents } from "../../data/events";

export default function EventListItem({ event, owner, groupId }) {
  const history = useHistory();
  const dispatch = useDispatch();

  const eventArr = event["@id"].split("/");
  const eventId = eventArr[eventArr.length - 1];
  const handleDeleteClick = (e, eventId) => {
    e.preventDefault();
    deleteEvent(eventId).then((response) => dispatch(searchEvents(groupId)));
  };
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
        {owner && (
          <ListItemSecondaryAction>
            <IconButton onClick={(e) => handleDeleteClick(e, eventId)}>
              <DeleteSweepIcon />
            </IconButton>
          </ListItemSecondaryAction>
        )}
      </ListItem>
    </>
  );
}
