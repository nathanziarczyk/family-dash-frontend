import React from "react";
import ListItem from "@material-ui/core/ListItem";
import { ListItemText, IconButton } from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";

export default function GroupListItem({ groupName, groupId, groupMembers }) {
  const members = groupMembers.length > 1 ? "members" : "member";

  const acceptRequest = () => {
    return null;
  };
  const denyRequest = () => {
    return null;
  };
  return (
    <ListItem key={groupId}>
      <ListItemText
        primary={groupName}
        secondary={`${groupMembers.length} ${members}`}
      />
      <IconButton onClick={acceptRequest}>
        <CheckCircleIcon color="primary" />
      </IconButton>
      <IconButton onClick={denyRequest}>
        <CancelIcon color="error" />
      </IconButton>
    </ListItem>
  );
}
