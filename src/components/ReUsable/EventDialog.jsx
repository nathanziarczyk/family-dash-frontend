import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { CardHeader, useMediaQuery, useTheme } from "@material-ui/core";

import { formatDate } from "../../helpers/formatDate";

export default function EventDialog({
  open,
  setOpen,
  event,
  attending,
  handleAttending,
}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const type = attending ? "remove" : "add";
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="form-dialog-title"
      fullScreen={fullScreen}
    >
      <CardHeader
        title={event.title}
        subheader={`${formatDate(event.start)} - ${formatDate(event.end)}`}
      />
      <DialogContent>
        <DialogContentText style={{ color: "black" }}>
          Description
        </DialogContentText>
        <DialogContentText>{event.description}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => handleAttending(event["@id"], type)}
          color="primary"
        >
          {attending ? "I'm not going" : "I'm going"}
        </Button>
        <Button onClick={() => setOpen(false)} color="primary">
          Hide
        </Button>
      </DialogActions>
    </Dialog>
  );
}
