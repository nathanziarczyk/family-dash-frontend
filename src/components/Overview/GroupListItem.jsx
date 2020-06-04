import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  ListItemText,
  IconButton,
  ListItemSecondaryAction,
  ListItem,
} from "@material-ui/core";
import DeleteSweepIcon from "@material-ui/icons/DeleteSweep";

import axios from "../../axios";
import { getGroups } from "../../data/groups";
import ErrorMessage from "../Messages/ErrorMessage";
import SuccessMessage from "../Messages/SuccessMessage";
import ConfirmDialog from "../ReUsable/ConfirmDialog";

export default function GroupListItem({
  groupName,
  groupId,
  groupMembers,
  groupAdmin,
}) {
  const dispatch = useDispatch();

  // ERROR / SUCCESS MESSAGE STATE
  const [message, setMessage] = useState({
    type: "",
    message: "",
  });

  // OPEN STATE VOOR CONFIRM MODAL
  const [confirmOpen, setConfirmOpen] = useState(false);

  // DE ID VAN DE INGELOGDE GEBRUIKER
  const currentUserId = useSelector((state) => state.user.user.id);

  const members = groupMembers.length > 1 ? "members" : "member";

  // GROEP VERWIJDEREN
  const handleDeleteGroupClick = () => {
    axios
      .delete(`/groups/${groupId}`)
      .then((response) => {
        setMessage({
          type: "success",
          message: `Group ${groupName} deleted.`,
        });
        dispatch(getGroups());
      })
      .catch((error) => {
        dispatch(getGroups());
        console.log(error.response);
        setMessage({
          type: "error",
          message: "Something went wrong, try again later",
        });
      });
  };

  return (
    <>
      <ListItem button key={groupId} component={Link} to={`/group/${groupId}`}>
        <ListItemText
          primary={groupName}
          secondary={`${groupMembers.length} ${members}`}
        />
        {currentUserId === groupAdmin && (
          <ListItemSecondaryAction>
            <IconButton
              style={{ zIndex: "2000" }}
              onClick={(e) => {
                e.preventDefault();
                setConfirmOpen(true);
              }}
            >
              <DeleteSweepIcon />
            </IconButton>
          </ListItemSecondaryAction>
        )}
      </ListItem>
      {message.message.length > 0 &&
        (message.type === "error" ? (
          <ErrorMessage message={message.message} />
        ) : (
          <SuccessMessage message={message.message} />
        ))}
      <ConfirmDialog
        title="Delete group?"
        open={confirmOpen}
        setOpen={setConfirmOpen}
        onConfirm={handleDeleteGroupClick}
      >
        Are you sure you want to delete group: <b>{groupName}</b>
      </ConfirmDialog>
    </>
  );
}
