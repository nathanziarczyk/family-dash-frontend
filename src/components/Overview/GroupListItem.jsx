import React, { useState } from "react";
import ListItem from "@material-ui/core/ListItem";
import { ListItemText, IconButton } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
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
  const [message, setMessage] = useState({
    type: "",
    message: "",
  });
  const history = useHistory();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const currentUserId = useSelector((state) => state.user.user.id);
  const dispatch = useDispatch();

  const members = groupMembers.length > 1 ? "members" : "member";

  const handleDeleteGroupClick = () => {
    axios
      .delete(`/groups/${groupId}`)
      .then((response) => {
        setMessage({
          type: "success",
          message: `Group ${groupName} deleted.`,
        });
        dispatch(getGroups());
        history.push("/overview");
      })
      .catch((error) => {
        dispatch(getGroups());
        setMessage({
          type: "error",
          message: "Something went wrong, try again later",
        });
      });
  };
  return (
    <Link to={`/group/${groupId}`}>
      <ListItem button key={groupId}>
        <ListItemText
          primary={groupName}
          secondary={`${groupMembers.length} ${members}`}
        />
        {currentUserId === groupAdmin && (
          <IconButton
            style={{ zIndex: "2000" }}
            onClick={(e) => {
              e.preventDefault();
              setConfirmOpen(true);
            }}
          >
            <DeleteSweepIcon />
          </IconButton>
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
        Are you sure you want to delete group: {groupName}
      </ConfirmDialog>
    </Link>
  );
}
