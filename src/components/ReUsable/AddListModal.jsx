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
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import axios from "../../axios";

export default function AddListModal({ open, setOpen, setAddedLoading }) {
  const history = useHistory();

  const [title, setTitle] = useState("");

  const [inputError, setInputError] = useState(false);

  const currentGroupId = useSelector((state) => state.group.id);
  const id = null;

  const handleAddList = (e) => {
    e.preventDefault();
    if (title.length === 0) {
      setInputError(true);
      return null;
    }
    setOpen(false);
    setAddedLoading(true);
    axios
      .post(`/shopping_lists`, {
        title,
        groep: `/api/groups/${currentGroupId}`,
      })
      .then((response) => {
        setAddedLoading(false);
        const arr = response.data["@id"].split("/");
        id = arr[arr.length - 1];
      })
      .catch((error) => console.log(error.response));
    return null;
  };
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
