import React from "react";
import { List, ListItem, ListItemText, Typography } from "@material-ui/core";

export default function EventsSummary() {
  return (
    <List>
      <ListItem>
        <ListItemText>
          <Typography variant="h5">Upcoming events</Typography>
        </ListItemText>
      </ListItem>
      <ListItem button>
        <ListItemText primary="Event" secondary="12 mei 2020" />
      </ListItem>
      <ListItem button>
        <ListItemText primary="Event" secondary="12 mei 2020" />
      </ListItem>
      <ListItem button>
        <ListItemText primary="Event" secondary="12 mei 2020" />
      </ListItem>
      <ListItem button>
        <ListItemText primary="Event" secondary="12 mei 2020" />
      </ListItem>
      <ListItem button>
        <ListItemText primary="Event" secondary="12 mei 2020" />
      </ListItem>
    </List>
  );
}
