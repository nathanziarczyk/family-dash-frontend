import React, { useEffect, useState } from "react";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  makeStyles,
  IconButton,
} from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

import axios from "../../axios";
import { useDispatch } from "react-redux";
import { addItem } from "../../data/shoppingList";

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: theme.spacing(2),
  },
  textField: {
    width: "65%",
  },
  selectField: {
    width: "25%",
  },
}));

export default function AddItem({ listId, currentUser, addLoading }) {
  const dispatch = useDispatch();
  const classes = useStyles();

  const [categories, setCategories] = useState([]);

  // InputFields state
  const [categoryInput, setCategoryInput] = useState("");
  const [nameInput, setNameInput] = useState("");

  const handleAddItem = (e) => {
    e.preventDefault();
    dispatch(
      addItem({
        title: nameInput,
        catId: categoryInput,
        userId: currentUser,
        listId,
      })
    );
  };

  useEffect(() => {
    axios
      .get(`/shopping_categories`)
      .then((response) => setCategories(response.data["hydra:member"]));
  }, []);
  return (
    <form onSubmit={handleAddItem} className={classes.form}>
      <TextField
        value={nameInput}
        onChange={(e) => {
          setNameInput(e.target.value);
        }}
        variant="outlined"
        size="small"
        label="New item"
        className={classes.textField}
      />
      <FormControl
        variant="outlined"
        size="small"
        className={classes.selectField}
      >
        <InputLabel id="category-select-label">Category</InputLabel>
        <Select
          label="Category"
          labelId="category-select-label"
          value={categoryInput}
          onChange={(e) => {
            setCategoryInput(e.target.value);
          }}
        >
          {categories.map((cat) => (
            <MenuItem key={cat.id} value={cat.id}>
              {cat.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <IconButton type="submit">
        <AddCircleOutlineIcon />
      </IconButton>
    </form>
  );
}
