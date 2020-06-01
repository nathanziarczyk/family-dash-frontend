import React from "react";
import { ListItem, ListItemText } from "@material-ui/core";

import { formatDate } from "../../helpers/formatDate";
import { useHistory } from "react-router-dom";

export default function EventListItem({ event }) {
  const history = useHistory();
  const eventArr = event["@id"].split("/");
  const eventId = eventArr[eventArr.length - 1];
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
      </ListItem>
    </>
  );
}
