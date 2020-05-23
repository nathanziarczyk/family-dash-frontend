import React from "react";
import { List, ListItem, ListItemText, Typography } from "@material-ui/core";
import moment from "moment";

export default function EventsSummary({ events }) {
  return (
    <List>
      <ListItem>
        <ListItemText>
          <Typography variant="h5">Upcoming events</Typography>
        </ListItemText>
      </ListItem>
      {events.map((event, index) => {
        if (index > 5) return null;
        return (
          <ListItem button>
            <ListItemText
              primary={event.title}
              secondary={moment(event.start).format("LLL")}
            />
          </ListItem>
        );
      })}
    </List>
  );
}
