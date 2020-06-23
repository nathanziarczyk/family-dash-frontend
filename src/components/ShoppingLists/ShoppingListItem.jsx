import React, { useState } from "react";
import {
  ListItem,
  ListItemText,
  Checkbox,
  IconButton,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { useDispatch } from "react-redux";

import ConfirmDialog from "../ReUsable/ConfirmDialog";
import { deleteItem } from "../../data/shoppingList";

export default function ShoppingListItem({ item, listId }) {
  const dispatch = useDispatch();

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

  const [open, setOpen] = useState(false);

  const deleteListItem = (id) => {
    dispatch(deleteItem(id, listId));
  };
  return (
    <ListItem key={item.id}>
      <ListItemText
        className={completed ? "line-trough" : ""}
        primary={item.title}
      />
      <Checkbox
        color="primary"
        checked={completed}
        onChange={toggleCompleted}
      />
      <IconButton>
        <DeleteIcon onClick={setOpen} />
      </IconButton>
      <ConfirmDialog
        open={open}
        setOpen={setOpen}
        title="Do you want to delete this item?"
        onConfirm={() => deleteListItem(item.id)}
      />
    </ListItem>
  );
}
