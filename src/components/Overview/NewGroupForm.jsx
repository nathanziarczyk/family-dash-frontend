import React, { useState } from "react";
import {
  TextField,
  makeStyles,
  Typography,
  IconButton,
  Button,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  useTheme,
  useMediaQuery,
  Divider,
  InputAdornment,
} from "@material-ui/core";
import DeleteSweepIcon from "@material-ui/icons/DeleteSweep";
import SearchIcon from "@material-ui/icons/Search";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../axios";
import Skeleton from "react-loading-skeleton";

import { newGroup } from "../../data/groups";
import SuccessMessage from "../Messages/SuccessMessage";
import ErrorMessage from "../Messages/ErrorMessage";
import SearchUserInput from "../ReUsable/SearchUserInput";

// CSS CLASSES
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
    marginBottom: theme.spacing(3),
  },
  inputFullWidth: {
    width: "100%",
    marginBottom: theme.spacing(3),
  },
  addFriendButton: {
    color: theme.palette.primary.main,
  },
}));

export default function NewGroupForm({ loading, newGroupMessage }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));

  // GET CURRENT USER ID
  const currentUserId = useSelector((state) => state.user.user.id);

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
    axios
      .get(`/users/${userId}`)
      .then((response) => {
        if (response !== undefined) {
          const user = response.data;
          // ALS DE GEBRUIKER AL IS TOEGEVOEGD -> ERROR
          users.map((use) => {
            if (use.id === user.id) check = true;
            return null;
          });
          // ALS DE USER ZICHZELF TOEVOEGT -> ERROR
          if (currentUserId === user.id) check = true;
          if (check === true) {
            setError("You already added this user.");
            check = false;
          } else {
            setUsers([...users, user]);
            setUsersInput("");
          }
        } else {
          // GEEN GEBRUIKERS GEVONDEN -> ERROR
          setError("Can't find a registered user with this email.");
        }
      })
      .catch((error) => {
        setError(error);
      });
  };

  // HANDLE SUGGESTIE USERS NA VERANDERING IN INPUT
  const handleAddUserFieldChange = (e) => {
    setUsersInput(e.target.value);
    setError("");
    if (e.target.value.length > 1) {
      setSuggestionsLoading(true);
      axios.get(`/users?email=${e.target.value}`).then((response) => {
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
    if (groupNameInput === "") {
      setError("Please choose a group name.");
      return null;
    }
    dispatch(newGroup({ groupName: groupNameInput, users: usersToAdd }));
    setGroupNameInput("");
    setUsersInput("");
    setUsers([]);
    setError("");
  };

  // REMOVE USER FROM LIST
  const handleRemoveUserClick = (id) => {
    const newUsers = users.filter((user) => user.id !== id);
    setUsers([...newUsers]);
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
              label="Group Name"
              variant="outlined"
              size="small"
              className={mobile ? classes.inputFullWidth : classes.input}
              value={groupNameInput}
              onChange={(e) => setGroupNameInput(e.target.value)}
              error={error.length > 0}
            />
            <SearchUserInput
              setUsersInput={setUsersInput}
              usersInput={usersInput}
              setSuggestions={setSuggestions}
              setSuggestionsLoading={setSuggestionsLoading}
              className={mobile ? classes.inputFullWidth : classes.input}
            />
            {usersInput.length > 1 && (
              <List dense className={!mobile && classes.addedUsersList}>
                {suggestionsLoading ? (
                  <ListItem>
                    <ListItemText
                      primary={<Skeleton width={200} />}
                      secondary={<Skeleton width={100} />}
                    />
                  </ListItem>
                ) : (
                  suggestions.map((user) => (
                    <ListItem
                      button
                      key={user.id}
                      onClick={() => handleAddUser(user.id)}
                    >
                      <ListItemText
                        primary={user.email}
                        secondary={`${user.firstName} ${user.lastName}`}
                      />
                    </ListItem>
                  ))
                )}
              </List>
            )}
            <Button type="submit" variant="outlined">
              {loading ? (
                <CircularProgress color="primary" size="1.8em" />
              ) : (
                "Create group"
              )}
            </Button>
          </form>

          {users.length > 0 && (
            <List dense className={!mobile && classes.addedUsersList}>
              <ListItem key={1}>
                <ListItemText>
                  <b>Added users</b>
                </ListItemText>
              </ListItem>
              <Divider />
              {users.map((user) => (
                <ListItem key={user.id}>
                  <ListItemText
                    primary={user.email}
                    secondary={`${user.firstName} ${user.lastName}`}
                  />
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
