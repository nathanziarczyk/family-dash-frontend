import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  List,
  TextField,
  CircularProgress,
  ListItem,
  ListItemText,
  makeStyles,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
} from "@material-ui/core";
import Skeleton from "react-loading-skeleton";
import { useSelector, useDispatch } from "react-redux";

import axios from "../../axios";
import ShoppingListItem from "./ShoppingListItem";
import { getLists } from "../../data/shoppingLists";
import {
  addShoppingListItem,
  addToState,
} from "../../helpers/addShoppingListItem";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: `1em 0`,
  },
  formContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textField: {
    width: "60%",
  },
  selectField: {
    width: "28%",
  },
}));

export default function ShoppingListDetail({ props }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  // Trigger useEffect
  const [added, setAdded] = useState(false);

  // ID ingelogde user & groep
  const currentUserId = useSelector((state) => state.user.user.id);
  const currentGroupId = useSelector((state) => state.group.id);

  // Alle boodschappenlijstjes om later het juiste uit op te vragen.
  const thisList = useSelector((state) =>
    state.shoppingLists.shoppingLists.find(
      (oneList) => oneList.list.id === Number.parseInt(props.match.params.id)
    )
  );

  // Full list
  const [list, setList] = useState([]);

  // Categorieën
  const [categories, setCategories] = useState([]);

  // Lijst items gesorteerd op categorie
  const [meat, setMeat] = useState([]);
  const [other, setOther] = useState([]);
  const [veggies, setVeggies] = useState([]);
  const [drinks, setDrinks] = useState([]);

  const stateVars = {
    1: { setter: setOther, getter: other },
    2: { setter: setMeat, getter: meat },
    3: { setter: setVeggies, getter: veggies },
    4: { setter: setDrinks, getter: drinks },
  };

  // Categorieën, naam input
  const [catergoriesSelect, setCatergoriesSelect] = useState("");
  const [newItem, setNewItem] = useState("");
  const [selectError, setSelectError] = useState(false);
  const [newItemError, setNewItemError] = useState(false);

  // Loading state nadat een nieuw item is toegevoegd
  const [addLoading, setAddLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const id = props.match.params.id;

  // Lijst details ophalen na laden pagina
  useEffect(() => {
    dispatch(getLists(currentGroupId));
    setLoading(true);
    setList(thisList.list);
    setMeat(thisList.meat);
    setVeggies(thisList.veggies);
    setOther(thisList.other);
    setDrinks(thisList.drinks);
    setLoading(false);
    axios
      .get(`/shopping_categories`)
      .then((response) => {
        setCategories(response.data["hydra:member"]);
      })
      .catch((error) => console.log(error.response));
  }, [id]);

  // Een item toevoegen
  const handleAddItem = (e) => {
    e.preventDefault();
    if (newItem === "" && catergoriesSelect === "") {
      setSelectError(true);
      setNewItemError(true);
      return null;
    }
    if (newItem === "") {
      setNewItemError(true);
      return null;
    }
    if (catergoriesSelect === "") {
      setSelectError(true);
      return null;
    }
    setAddLoading(true);
    addShoppingListItem(newItem, catergoriesSelect, id, currentUserId)
      .then((response) => {
        setAddLoading(false);
        setNewItem("");
        setCatergoriesSelect("");
        const { getter, setter } = addToState(stateVars, catergoriesSelect);
        setter([...getter, response.data]);
      })
      .catch((error) => console.log(error.response));
  };
  return (
    <>
      <Grid item xs={false} sm={3} />
      <Grid item xs={12} sm={6} className={classes.container}>
        {loading && (
          <>
            <Skeleton width={100} />
            <List>
              <ListItem>
                <ListItemText primary={<Skeleton width={300} />} />
              </ListItem>
              <ListItem>
                <ListItemText primary={<Skeleton width={300} />} />
              </ListItem>
              <ListItem>
                <ListItemText primary={<Skeleton width={300} />} />
              </ListItem>
            </List>
          </>
        )}
        {!loading && (
          <>
            <Typography>{list.title}</Typography>
            <div style={{ marginTop: "1em" }}>
              <form onSubmit={handleAddItem} className={classes.formContainer}>
                <TextField
                  className={classes.textField}
                  variant="outlined"
                  fullWidth
                  size="small"
                  label="New item"
                  value={newItem}
                  onChange={(e) => {
                    setNewItemError(false);
                    setNewItem(e.target.value);
                  }}
                  error={newItemError && "error"}
                />
                <FormControl className={classes.selectField} size="small">
                  <InputLabel id="label">Select category*</InputLabel>
                  <Select
                    error={selectError && "error"}
                    variant="outlined"
                    value={catergoriesSelect}
                    onChange={(e) => {
                      setSelectError(false);
                      setCatergoriesSelect(e.target.value);
                    }}
                    labelId="label"
                  >
                    <MenuItem key="placeholder" value="" disabled>
                      Select category
                    </MenuItem>
                    {categories.map((cat) => (
                      <MenuItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Button
                  size="large"
                  variant="outlined"
                  className="reset-border"
                  type="submit"
                >
                  {addLoading ? <CircularProgress size={25} /> : "Add"}
                </Button>
              </form>
              <List dense>
                <ListItem
                  key={`title-meat`}
                  style={{ background: "lightgrey" }}
                >
                  <ListItemText primary={`Meat`} />
                </ListItem>
                {meat.map((item) => (
                  <ShoppingListItem key={item.id} item={item} />
                ))}

                <ListItem
                  key={`title-veggies`}
                  style={{ background: "lightgrey" }}
                >
                  <ListItemText primary={`Veggies`} />
                </ListItem>
                {veggies.map((item) => (
                  <ShoppingListItem key={item.id} item={item} />
                ))}

                <ListItem
                  key={`title-drinks`}
                  style={{ background: "lightgrey" }}
                >
                  <ListItemText primary={`Drinks`} />
                </ListItem>
                {drinks.map((item) => (
                  <ShoppingListItem key={item.id} item={item} />
                ))}

                <ListItem
                  key={`title-other`}
                  style={{ background: "lightgrey" }}
                >
                  <ListItemText primary={`Other`} />
                </ListItem>
                {other.map((item) => (
                  <ShoppingListItem key={item.id} item={item} />
                ))}
              </List>
            </div>
          </>
        )}
      </Grid>
      <Grid item xs={false} sm={3} />
    </>
  );
}
