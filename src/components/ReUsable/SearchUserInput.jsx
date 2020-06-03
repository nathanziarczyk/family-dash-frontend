import React from "react";
import { TextField, InputAdornment } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

import axios from "../../axios";

export default function SearchUserInput({
  usersInput,
  setUsersInput,
  setSuggestions,
  setSuggestionsLoading,
  className,
}) {
  // HANDLE SUGGESTIE USERS NA VERANDERING IN INPUT
  const handleAddUserFieldChange = (e) => {
    setUsersInput(e.target.value);
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
  return (
    <TextField
      label="Search users by email"
      variant="outlined"
      size="small"
      value={usersInput}
      onChange={handleAddUserFieldChange}
      className={className}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
}
