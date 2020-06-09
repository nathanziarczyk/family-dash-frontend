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
} from "@material-ui/core";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import arrayMove from "array-move";
import Skeleton from "react-loading-skeleton";
import { useSelector } from "react-redux";

import axios from "../../axios";
import ShoppingListItem from "./ShoppingListItem";

const SortableListOther = SortableContainer(({ items }) => {
  return (
    <List dense>
      {items.map((item, index) => (
        <SortableItemOther key={`item-${item.id}`} index={index} value={item} />
      ))}
    </List>
  );
});
const SortableItemOther = SortableElement(({ value }) => (
  <ShoppingListItem item={value} />
));

const SortableList = SortableContainer(({ items }) => {
  return (
    <List dense>
      {items.map((item, index) => (
        <SortableItem key={`item-${item.id}`} index={index} value={item} />
      ))}
    </List>
  );
});
const SortableItem = SortableElement(({ value }) => (
  <ShoppingListItem item={value} />
));

const useStyles = makeStyles((theme) => ({
  container: {
    padding: `1em 0`,
  },
}));

export default function ShoppingListDetail({ props }) {
  // Full list
  const [list, setList] = useState([]);

  // List items sorted by category
  const [meat, setMeat] = useState([]);
  const [other, setOther] = useState([]);
  const [veggies, setVeggies] = useState([]);
  const [drinks, setDrinks] = useState([]);

  const [shoppingListItems, setShoppingListItems] = useState([]);
  const [addLoading, setAddLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newItem, setNewItem] = useState("");

  const classes = useStyles();

  const currentUserId = useSelector((state) => state.user.user.id);
  const allShoppingLists = useSelector(
    (state) => state.shoppingLists.shoppingLists
  );

  const id = props.match.params.id;

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setOther(({ items }) => arrayMove(shoppingListItems, oldIndex, newIndex));
  };

  useEffect(() => {
    setLoading(true);
    const thisList = allShoppingLists.find(
      (oneList) => oneList.list.id === Number.parseInt(id)
    );
    setList(thisList.list);
    setMeat(thisList.meat);
    setVeggies(thisList.veggies);
    setOther(thisList.other);
    setDrinks(thisList.other);
    setLoading(false);
    // axios
    //   .get(`/shopping_lists/${id}`)
    //   .then((response) => {
    //     setLoading(false);
    //     setList(response.data);
    //     setShoppingListItems([...response.data.shoppingListItems]);
    //   })
    //   .catch((error) => console.log(error));
  }, [id]);

  const handleAddItem = (e) => {
    e.preventDefault();
    setAddLoading(true);
    if (newItem.length === 0) return null;
    axios
      .post(`/shopping_list_items`, {
        title: newItem,
        user: `/api/users/${currentUserId}`,
        shoppingList: `api/shopping_lists/${id}`,
      })
      .then((response) => {
        shoppingListItems.unshift(response.data);
        setShoppingListItems([...shoppingListItems]);
        setAddLoading(false);
      })
      .catch(console.log);
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
              <form onSubmit={handleAddItem}>
                <TextField
                  variant="outlined"
                  fullWidth
                  size="small"
                  label="New item"
                  value={newItem}
                  onChange={(e) => setNewItem(e.target.value)}
                />
                {addLoading && <CircularProgress />}
              </form>
              <SortableListOther
                items={other}
                onSortEnd={onSortEnd}
                lockAxis="y"
                pressDelay={300}
              />
              <SortableList
                items={shoppingListItems}
                onSortEnd={onSortEnd}
                lockAxis="y"
                pressDelay={300}
              />
            </div>
          </>
        )}
      </Grid>
      <Grid item xs={false} sm={3} />
    </>
  );
}
