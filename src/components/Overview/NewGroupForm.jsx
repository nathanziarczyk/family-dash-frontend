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
import DeleteSweepIcon from "@material-ui/icons/DeleteSweep";
import { useDispatch, useSelector } from "react-redux";
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
  addedUsersList: {
    margin: "0 auto",
    width: "60%",
  },
  input: {
    width: "60%",
    marginBottom: theme.spacing(1),
  },
  addFriendButton: {
    color: theme.palette.primary.main,
  },
}));

export default function NewGroupForm({ loading, newGroupMessage }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  // GET CURRENT USER ID
  const currentUserId = useSelector((state) => state.user.user.id);

  // LOADING STATE SEARCH USERS
  const [searchLoading, setSearchLoading] = useState(false);

  // STATE LIJST MET TOEGEVOEGDE USERS AAN GROEP
  const [users, setUsers] = useState([]);

  // INPUTFIELD STATE
  const [groupNameInput, setGroupNameInput] = useState("");
  const [usersInput, setUsersInput] = useState("");

  // INPUTFIELD ERROR STATE
  const [error, setError] = useState("");

  // STATE SUGGESTIONS
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionsLoading, setSuggestionsLoading] = useState(false);

  // USER TOEVOEGEN AAN GROEP HANDLER
  const handleAddUser = (userId) => {
    // BOOL VOOR ERRORS
    let check = false;
    setSearchLoading(true);
    axios
      .get(`${process.env.REACT_APP_API}/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("jwt")}`,
        },
      })
      .then((response) => {
        setSearchLoading(false);
        if (response !== undefined) {
          const user = response.data;
          users.map((use) => {
            if (use.id === user.id) check = true;
          });
          if (currentUserId === user.id) check = true;
          if (check === true) {
            setError("You already added this user.");
            check = false;
          } else {
            setUsers([...users, user]);
            setUsersInput("");
          }
        } else {
          setError("Can't find a registered user with this email.");
        }
      })
      .catch((error) => {
        setError(error);
        setSearchLoading(false);
      });
  };

  // VERANDERING IN ADD USER INPUT HANDLER
  const handleAddUserFieldChange = (e) => {
    setUsersInput(e.target.value);
    setError("");
    if (e.target.value.length > 1) {
      setSuggestionsLoading(true);
      axios
        .get(`${process.env.REACT_APP_API}/users?email=${e.target.value}`, {
          headers: {
            Authorization: `Bearer ${Cookies.get("jwt")}`,
          },
        })
        .then((response) => {
          setSuggestionsLoading(false);
          setSuggestions(response.data["hydra:member"]);
        });
    } else {
      setSuggestions([]);
    }
  };

  // FORM SUBMIT HANDLER
  const handleNewGroupFormSubmit = (e) => {
    e.preventDefault();
    const usersToAdd = users.map((user) => user.id);
    console.log(usersToAdd);
    if (groupNameInput === "") {
      setError("Please choose a group name.");
      return null;
    }
    dispatch(newGroup({ groupName: groupNameInput, users: usersToAdd }));
    setGroupNameInput("");
    setUsersInput("");
    setUsers([]);
  };

  // REMOVE USER FROM LIST
  const handleRemoveUserClick = (id) => {
    const newUsers = users.filter((user) => user.id !== id);
    setUsers([...newUsers]);
    console.log(users);
    return null;
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
              margin="dense"
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
                Search
              </InputLabel>
              <OutlinedInput
                margin="dense"
                placeholder="Search users by email"
                id="outlined-adornment-password"
                onChange={handleAddUserFieldChange}
                value={usersInput}
                labelWidth={70}
              />
              {usersInput.length > 1 ? (
                <List dense>
                  <ListItem>
                    <ListItemText></ListItemText>
                  </ListItem>
                  <ListItem>
                    <ListItemText>Users</ListItemText>
                  </ListItem>
                  {suggestionsLoading ? (
                    <CircularProgress />
                  ) : (
                    suggestions.map((user) => (
                      <ListItem button onClick={() => handleAddUser(user.id)}>
                        <ListItemText
                          primary={user.email}
                          secondary={`${user.firstName} ${user.lastName}`}
                        />
                      </ListItem>
                    ))
                  )}
                </List>
              ) : (
                ""
              )}
            </FormControl>
            <Button type="submit" variant="outlined">
              {loading ? (
                <CircularProgress color="primary" size="1.8em" />
              ) : (
                "Create group"
              )}
            </Button>
          </form>

          {users.length > 0 && (
            <List dense className={classes.addedUsersList}>
              <ListItem key={1}>
                <ListItemText>Added users</ListItemText>
              </ListItem>
              {users.map((user) => (
                <ListItem key={user.id}>
                  <ListItemText
                    primary={user.email}
                    secondary={`${user.firstName} ${user.lastName}`}
                  />
                  {/* LEFTOFF: Gebruiker verwijderen uit lijst */}
                  <IconButton
                    onClick={() => handleRemoveUserClick(user.id)}
                    edge="end"
                    size="small"
                  >
                    <DeleteSweepIcon />
                  </IconButton>
                </ListItem>
              ))}
            </List>
          )}
          {newGroupMessage.length > 0 && (
            <SuccessMessage message={newGroupMessage} />
          )}
          {error.length > 0 && (
            <ErrorMessage message={error} clearError={setError} />
          )}
        </div>
      )}
    </>
  );
}
