import React, { useState } from "react";
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Checkbox,
} from "@material-ui/core";

export default function ShoppingListItem({ item }) {
  const [completed, setCompleted] = useState(false);
  if (item.type === "category")
    return (
      <ListItem style={{ background: "lightgrey" }}>
        <ListItemText
          className={completed ? "line-trough" : ""}
          primary={`${item.title}`}
        />
      </ListItem>
    );
  else
    return (
      <ListItem button>
        <ListItemText
          className={completed ? "line-trough" : ""}
          primary={item.title}
        />
        <ListItemSecondaryAction>
          <Checkbox
            color="primary"
            checked={completed}
            onChange={() => setCompleted(!completed)}
          />
        </ListItemSecondaryAction>
      </ListItem>
    );
}
