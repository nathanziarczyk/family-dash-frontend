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
import axios from "axios";
import Cookies from "js-cookie";

import { newGroup } from "../../data/groups";
import SuccessMessage from "../Messages/SuccessMessage";
import ErrorMessage from "../Messages/ErrorMessage";

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

export default function NewGroupForm({ loading, newGroupMessage }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  // STATE LIJST MET TOEGEVOEGDE USERS AAN GROEP
  const [users, setUsers] = useState([]);

  // INPUTFIELD STATE
  const [groupNameInput, setGroupNameInput] = useState("");
  const [usersInput, setUsersInput] = useState("");

  // INPUTFIELD ERROR STATE
  const [error, setError] = useState("");

  // USER TOEVOEGEN AAN GROEP HANDLER
  const handleAddUserClick = (e) => {
    if (usersInput === "") {
      setError("Please add an email for the user you want to add.");
      return null;
    }
    axios
      .get(`${process.env.REACT_APP_API}/users?email=${usersInput}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("jwt")}`,
        },
      })
      .then((response) => {
        if (response.data["hydra:totalItems"] === 1) {
          const user = response.data["hydra:member"][0];
          setUsers([...users, user]);
        } else {
          setError("Can't find a registered user with this email.");
        }
      })
      .catch((error) => setError);
  };

  // VERANDERING IN ADD USER INPUT HANDLER
  const handleAddUserFieldChange = (e) => {
    setUsersInput(e.target.value);
    setError("");
  };

  // FORM SUBMIT HANDLER
  const handleNewGroupFormSubmit = (e) => {
    e.preventDefault();
    if (groupNameInput === "" || usersInput === "") {
      setError("Please choose a group name.");
      return null;
    }
    dispatch(newGroup(groupNameInput));
    setGroupNameInput("");
    setUsersInput("");
    setUsers([]);
  };

  return (
    <>
      {!loading && (
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
            <FormControl
              variant="outlined"
              size="small"
              className={classes.input}
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Add user
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                onChange={handleAddUserFieldChange}
                value={usersInput}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      edge="end"
                      size="small"
                      onClick={handleAddUserClick}
                    >
                      <AddCircleRoundedIcon
                        className={classes.addFriendButton}
                      />
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={70}
              />
            </FormControl>
            {users.length > 0 && (
              <List dense>
                {users.map((user) => (
                  <ListItem key={user.id} data-id={user.id}>
                    <ListItemText>{user.email}</ListItemText>
                  </ListItem>
                ))}
              </List>
            )}
            <Button type="submit" variant="outlined">
              {loading ? (
                <CircularProgress color="primary" size="1.8em" />
              ) : (
                "GO"
              )}
            </Button>
            {newGroupMessage.length > 0 && (
              <SuccessMessage message={newGroupMessage} />
            )}
            {error.length > 0 && (
              <ErrorMessage message={error} clearError={setError} />
            )}
          </form>
        </div>
      )}
    </>
  );
}
