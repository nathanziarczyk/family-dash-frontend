import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@material-ui/core";

export default function NoteListItem({ note, groupLoading, mobile }) {
  return (
    <Card style={{ height: mobile ? "100%" : "85%" }}>
      <CardContent style={{ height: "70%" }}>
        <Typography color="textSecondary" gutterBottom>
          {note.user}
        </Typography>
        <Typography variant="h5" component="h2">
          {note.title}
        </Typography>
        <Typography color="textSecondary">{note.created}</Typography>
        <Typography
          variant="body2"
          component="p"
          dangerouslySetInnerHTML={{ __html: note.shortBody }}
        ></Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Read More</Button>
      </CardActions>
    </Card>
  );
}
