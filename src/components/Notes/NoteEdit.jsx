import React, { useState } from "react";
import { TextField, Typography, Button, makeStyles } from "@material-ui/core";
import { Editor } from "@tinymce/tinymce-react";
import { useSelector, useDispatch } from "react-redux";

import { editNote } from "../../data/notes";

const useStyles = makeStyles((theme) => ({
  textfield: {
    padding: "1em 0",
  },
}));

export default function NoteEdit({ note, id, setEdit }) {
  const classes = useStyles();
  const [title, setTitle] = useState(note.title);
  const [body, setBody] = useState(note.body);

  const dispatch = useDispatch();

  const groupId = useSelector((state) => state.group.id);

  const handleSubmit = () => {
    dispatch(editNote(id, title, body, groupId));
    setEdit(false);
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
        onChange={(e) => setTitle(e.target.value)}
      />
      <Editor
        className={classes.textfield}
        apiKey={process.env.REACT_APP_TINY}
        value={body}
        init={{
          height: 300,
          menubar: false,
          plugins: ["autolink", "emoticons"],
          toolbar:
            "undo redo  | bold italic backcolor | alignleft aligncenter | emoticons | help",
          default_link_target: "_blank",
        }}
        onEditorChange={(e) => setBody(e)}
      />
      <Button onClick={handleSubmit}>Save changes</Button>
    </div>
  );
}
