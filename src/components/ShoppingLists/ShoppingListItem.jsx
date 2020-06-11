import React, { useState } from "react";
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Checkbox,
} from "@material-ui/core";

export default function ShoppingListItem({ item, listId }) {
  const [completed, setCompleted] = useState(
    localStorage.getItem(`persist:list-${listId}`) === null
      ? false
      : JSON.parse(localStorage.getItem(`persist:list-${listId}`))[
          `item-${item.id}`
        ]
  );
  const toggleCompleted = () => {
    setCompleted(!completed);
    const index = `item-${item.id}`;
    const ls =
      JSON.parse(localStorage.getItem(`persist:list-${listId}`)) === null
        ? {}
        : JSON.parse(localStorage.getItem(`persist:list-${listId}`));
    ls[index] = !completed;
    localStorage.setItem(`persist:list-${listId}`, JSON.stringify(ls));
  };
  return (
    <ListItem key={item.id} button>
      <ListItemText
        className={completed ? "line-trough" : ""}
        primary={item.title}
      />
      <ListItemSecondaryAction>
        <Checkbox
          color="primary"
          checked={completed}
          onChange={toggleCompleted}
        />
      </ListItemSecondaryAction>
    </ListItem>
  );
}
