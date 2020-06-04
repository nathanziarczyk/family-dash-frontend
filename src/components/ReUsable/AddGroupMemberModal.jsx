import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  IconButton,
  makeStyles,
} from "@material-ui/core";
import Skeleton from "react-loading-skeleton";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import { useSelector } from "react-redux";

import SearchUserInput from "./SearchUserInput";
import axios from "../../axios";

const useStyles = makeStyles((theme) => ({
  fullWidth: {
    width: "100%",
  },
}));

export default function AddGroupMemberModal({ open, setOpen }) {
  const classes = useStyles();

  const handleClose = () => setOpen(false);
  const [usersInput, setUsersInput] = useState("");
  const [suggestionsLoading, setSuggestionsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState(false);
  const { id, members } = useSelector((state) => state.group);

  const addUserClick = (userId) => {
    axios
      .put(`/groups/${id}`, {
        addGroupMember: `/api/users/${userId}`,
      })
      .then((response) => setOpen(false))
      .catch((error) => "TODO:Error");
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle style={{ paddingBottom: ".3em" }}>Add user</DialogTitle>
      <DialogContent>
        <DialogContentText>Search a user by email to add.</DialogContentText>
        <SearchUserInput
          selected={true}
          usersInput={usersInput}
          setUsersInput={setUsersInput}
          setSuggestionsLoading={setSuggestionsLoading}
          setSuggestions={setSuggestions}
          className={classes.fullWidth}
        />
        <List dense={true}>
          <ListItem>
            {suggestions.length > 0 && !suggestionsLoading && (
              <>
                <ListItemText
                  primary={`${suggestions[0].firstName} ${suggestions[0].lastName}`}
                  secondary={suggestions[0].email}
                />
                <IconButton onClick={() => addUserClick(suggestions[0].id)}>
                  <GroupAddIcon />
                </IconButton>
              </>
            )}
            {suggestionsLoading && (
              <ListItemText
                primary={<Skeleton width={200} />}
                secondary={<Skeleton width={100} />}
              />
            )}
          </ListItem>
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
