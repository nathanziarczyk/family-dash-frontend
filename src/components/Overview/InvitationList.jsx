import React from "react";
import { List, ListItemText, ListItem } from "@material-ui/core";
import InvitationListItem from "./InvitationListItem";

export default function InvitationList({ invitations, loading }) {
  return (
    <>
      <List dense>
        {loading ? (
          ""
        ) : invitations.length > 0 ? (
          invitations.map((group) => {
            return (
              <InvitationListItem
                key={group.id}
                groupName={group.name}
                groupId={group.id}
                groupMembers={group.groupMembers}
              />
            );
          })
        ) : (
          <ListItem>
            <ListItemText primary="You have no invitations" />
          </ListItem>
        )}
      </List>
    </>
  );
}
