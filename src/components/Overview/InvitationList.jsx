import React from "react";
import {
  List,
  ListItemText,
  ListItem,
  CircularProgress,
} from "@material-ui/core";
import InvitationListItem from "./InvitationListItem";

export default function InvitationList({ invitations, error, loading }) {
  return (
    <List dense>
      {!loading &&
        invitations.length > 0 &&
        invitations.map((group) => {
          return (
            <InvitationListItem
              key={group.id}
              groupName={group.name}
              groupId={group.id}
              groupMembers={group.groupMembers}
            />
          );
        })}
      {!loading && invitations.length === 0 && (
        <ListItem>
          <ListItemText primary="You have no invitations" />
        </ListItem>
      )}
      {loading && <CircularProgress color="secondary" size="1.8em" />}
    </List>
  );
}
