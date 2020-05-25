import React, { useState } from "react";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={10} variant="filled" {...props} />;
}

export default function ErrorMessage({ message, clearError, position }) {
  const pos = position;

  let vertical = "";
  let horizontal = "";

  switch (pos) {
    case "bottomLeft":
      vertical = "bottom";
      horizontal = "left";
      break;
    case "bottomRight":
      vertical = "bottom";
      horizontal = "right";
      break;
    default:
      vertical = "bottom";
      horizontal = "center";
      break;
  }
  const [open, setOpen] = useState(true);
  const handleClose = () => {
    setOpen(false);
    if (clearError) clearError("");
  };
  return (
    <Snackbar
      style={{ marginBottom: "3em" }}
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical, horizontal }}
      key={`${vertical},${horizontal}`}
    >
      <Alert onClose={handleClose} severity="error">
        {message}
      </Alert>
    </Snackbar>
  );
}
