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
import { useDispatch } from "react-redux";

import { renameList, getList } from "../../data/shoppingList";

export default function AddListModal({ open, setOpen, id, current }) {
  const dispatch = useDispatch();

  const [title, setTitle] = useState(current);
  const [inputError, setInputError] = useState(false);

  const handleRename = async (e) => {
    e.preventDefault();
    if (title.length === 0) {
      setInputError(true);
      return null;
    }
    setOpen(false);
    await dispatch(renameList(title, id));
    dispatch(getList(id));
    return null;
  };
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle style={{ paddingBottom: ".3em" }}>
        Rename this list
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleRename}>
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
        <Button onClick={handleRename} color="primary">
          Rename
        </Button>
        <Button onClick={() => setOpen(false)} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
