import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Button,
  DialogActions,
  TextField,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { addList } from "../../data/shoppingLists";

export default function AddListModal({ open, setOpen }) {
  const dispatch = useDispatch();

  const history = useHistory();

  const [title, setTitle] = useState("");

  const [inputError, setInputError] = useState(false);

  const currentGroupId = useSelector((state) => state.group.id);
  const addedListId = useSelector((state) => state.shoppingLists.addedListId);

  const handleAddList = (e) => {
    e.preventDefault();
    if (title.length === 0) {
      setInputError(true);
      return null;
    }
    setOpen(false);
    dispatch(addList(title, currentGroupId));
    return null;
  };
  console.log(addedListId);
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle style={{ paddingBottom: ".3em" }}>
        Add shopping list
      </DialogTitle>
      <DialogContent>
        <DialogContentText>Create a new shopping list</DialogContentText>
        <form onSubmit={handleAddList}>
          <TextField
            label="Title*"
            variant="outlined"
            value={title}
            onChange={(e) => {
              setInputError(false);
              setTitle(e.target.value);
            }}
            fullWidth
            size="small"
            error={inputError}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleAddList} color="primary">
          Add
        </Button>
        <Button onClick={() => setOpen(false)} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
