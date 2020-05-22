import React from "react";
import ListItem from "@material-ui/core/ListItem";
import { ListItemText } from "@material-ui/core";

export default function GroupListItem({ groupName, groupId, groupMembers }) {
  const members = groupMembers.length > 1 ? "members" : "member";
  return (
    <ListItem button key={groupId}>
      <ListItemText
        primary={groupName}
        secondary={`${groupMembers.length} ${members}`}
      />
    </ListItem>
  );
}
