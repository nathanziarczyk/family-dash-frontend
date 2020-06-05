import React, { useState } from "react";
import { TextField, Typography, Button, makeStyles } from "@material-ui/core";
import { Editor } from "@tinymce/tinymce-react";

import { editNote } from "../../helpers/editNote";

const useStyles = makeStyles((theme) => ({
  textfield: {
    padding: "1em 0",
  },
}));

export default function NoteEdit({ note, id, setEdit }) {
  const classes = useStyles();
  const [title, setTitle] = useState(note.title);
  const [body, setBody] = useState(note.body);

  const handleSubmit = () => {
    editNote(id, title, body)
      .then((response) => setEdit(false))
      .catch((error) => console.log(error.response));
  };

  return (
    <div>
      <Typography variant="h6">Edit note: {note.title}</Typography>
      <TextField
        className={classes.textfield}
        variant="outlined"
        size="small"
        value={title}
        fullWidth
      />
      <Editor
        className={classes.textfield}
        apiKey={process.env.REACT_APP_TINY}
        value={body}
        init={{
          height: 300,
          menubar: false,
          plugins: [],
          toolbar:
            "undo redo  | bold italic backcolor | alignleft aligncenter | help",
        }}
        onEditorChange={(e) => setBody(e)}
      />
      <Button onClick={handleSubmit}>Save changes</Button>
    </div>
  );
}
