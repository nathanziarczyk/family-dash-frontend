import React, { useState } from "react";
import {
  TextField,
  makeStyles,
  Typography,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Button,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
} from "@material-ui/core";
import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded";
import { useDispatch } from "react-redux";

import { newGroup } from "../../data/groups";
import SuccessMessage from "../Messages/SuccessMessage";

const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: "100%",
    maxHeight: "100%",
    textAlign: "center",
    padding: theme.spacing(4),
  },
  title: {
    marginBottom: theme.spacing(2),
  },
  form: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  input: {
    width: "80%",
    paddingBottom: theme.spacing(1),
  },
  addFriendButton: {
    color: theme.palette.primary.main,
  },
}));

export default function NewGroupForm({ loading, error, newGroupMessage }) {
  const [users, setUsers] = useState([]);
  const [groupNameInput, setGroupNameInput] = useState("");
  const [usersInput, setUsersInput] = useState("");
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleAddUserClick = (e) => {
    if (usersInput === "") return null;
    setUsers([...users, usersInput]);
    setUsersInput("");
  };

  const handleNewGroupFormSubmit = (e) => {
    e.preventDefault();
    if (groupNameInput === "") return null;
    dispatch(newGroup(groupNameInput));
    setGroupNameInput("");
    setUsersInput("");
    setUsers("");
  };

  return (
    <div className={classes.container}>
      <Typography variant="h5" className={classes.title}>
        Make a new group
      </Typography>
      <form className={classes.form} onSubmit={handleNewGroupFormSubmit}>
        <TextField
          id="outlined-basic"
          label="Group Name"
          variant="outlined"
          size="small"
          className={classes.input}
          value={groupNameInput}
          onChange={(e) => setGroupNameInput(e.target.value)}
        />
        <FormControl variant="outlined" size="small" className={classes.input}>
          <InputLabel htmlFor="outlined-adornment-password">
            Add user
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            value={usersInput}
            onChange={(e) => setUsersInput(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  edge="end"
                  size="small"
                  onClick={handleAddUserClick}
                >
                  <AddCircleRoundedIcon className={classes.addFriendButton} />
                </IconButton>
              </InputAdornment>
            }
            labelWidth={70}
          />
        </FormControl>
        {users.length > 0 && (
          <List dense>
            {users.map((user) => (
              <ListItem>
                <ListItemText>{user}</ListItemText>
              </ListItem>
            ))}
          </List>
        )}
        <Button type="submit" variant="outlined">
          {loading ? <CircularProgress color="primary" size="1.8em" /> : "GO"}
        </Button>
        {newGroupMessage.length > 0 && (
          <SuccessMessage message={newGroupMessage} />
        )}
      </form>
    </div>
  );
}
