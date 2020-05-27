import React from "react";
import { ListItem, ListItemText, List } from "@material-ui/core";

import GroupListItem from "./GroupListItem";

export default function GroupList({ error, loading, groups }) {
  return (
    <>
      <List dense>
        {loading ? (
          ""
        ) : groups.length > 0 ? (
          groups.map((group) => {
            return (
              <GroupListItem
                key={group.id}
                groupName={group.name}
                groupId={group.id}
                groupMembers={group.groupMembers}
                groupAdmin={group.user.id}
              />
            );
          })
        ) : (
          <ListItem>
            <ListItemText primary="You have no groups" />
          </ListItem>
        )}
      </List>
    </>
  );
}
