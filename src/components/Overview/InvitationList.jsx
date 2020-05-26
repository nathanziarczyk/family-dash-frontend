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
                key={group.group.id}
                groupName={group.group.name}
                groupId={group.group.id}
                groupMembers={group.group.groupMembers}
                groupMemberId={group.groupMemberId}
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
