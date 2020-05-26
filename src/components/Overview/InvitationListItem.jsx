import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ListItem from "@material-ui/core/ListItem";
import { ListItemText, IconButton } from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";

import { userAcceptRequest, userDenyRequest } from "../../data/user";

export default function GroupListItem({
  groupName,
  groupId,
  groupMembers,
  groupMemberId,
}) {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.user.id);
  const members = groupMembers.length > 1 ? "members" : "member";
  const acceptRequest = () => {
    dispatch(userAcceptRequest({ groupId, userId }));
  };

  const denyRequest = () => {
    dispatch(userDenyRequest(groupMemberId));
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
