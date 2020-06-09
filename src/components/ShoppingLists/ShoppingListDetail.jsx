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
const SortableItem = SortableElement(({ value }) => (
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

const useStyles = makeStyles((theme) => ({
  container: {
    padding: `1em 0`,
  },
}));

export default function ShoppingListDetail({ props }) {
  const [list, setList] = useState([]);
  const [shoppingListItems, setShoppingListItems] = useState([]);
  const [addLoading, setAddLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newItem, setNewItem] = useState("");

  const classes = useStyles();

  const currentUserId = useSelector((state) => state.user.user.id);

  const categories = [
    { id: "cat-1", title: "Meat", type: "category" },
    { id: "cat-2", title: "Veggies", type: "category" },
    { id: "cat-3", title: "Dairy", type: "category" },
    { id: "cat-4", title: "Drinks", type: "category" },
  ];
  const id = props.match.params.id;

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setShoppingListItems(({ items }) =>
      arrayMove(shoppingListItems, oldIndex, newIndex)
    );
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/shopping_lists/${id}`)
      .then((response) => {
        setLoading(false);
        setList(response.data);
        setShoppingListItems([
          ...response.data.shoppingListItems,
          ...categories,
        ]);
      })
      .catch((error) => console.log(error));
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
