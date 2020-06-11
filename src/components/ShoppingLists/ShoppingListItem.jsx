import React, { useState } from "react";
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Checkbox,
} from "@material-ui/core";
import { toggleCompleted } from "../../data/shoppingList";
import { useDispatch } from "react-redux";

export default function ShoppingListItem({ item, catName }) {
  const dispatch = useDispatch();
  const [completed, setCompleted] = useState(false);
  const toggleItemCompleted = () => {
    dispatch(toggleCompleted({ itemId: item.id, catName }));
  };
  return (
    <ListItem key={item.id} button>
      <ListItemText
        className={item.completed ? "line-trough" : ""}
        primary={item.title}
      />
      <ListItemSecondaryAction>
        <Checkbox
          color="primary"
          checked={item.completed}
          onChange={toggleItemCompleted}
        />
      </ListItemSecondaryAction>
    </ListItem>
  );
}
