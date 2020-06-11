import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Grid,
  Typography,
  makeStyles,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";

import { getList } from "../../data/shoppingList";
import { formatDate } from "../../helpers/formatDate";
import ShoppingListItem from "./ShoppingListItem";
import AddItem from "./AddItem";

const useStyles = makeStyles((theme) => ({
  header: {
    backgroundColor: theme.palette.primary.dark,
    color: "white",
    padding: theme.spacing(2),
  },
  title: {
    backgroundColor: theme.palette.secondary.main,
  },
  subTitle: {
    fontWeight: "lighter",
  },
}));

export default function ShoppingListDetail({ props }) {
  const dispatch = useDispatch();
  const classes = useStyles();

  const list = useSelector((state) => state.shoppingList);
  const currentUser = useSelector((state) => state.user.user.id);

  const id = props.match.params.id;

  useEffect(() => {
    dispatch(getList(id));
  }, []);

  const displayCategories = [
    { title: "Other", list: list.other },
    { title: "Meat", list: list.meat },
    { title: "Veggies", list: list.veggies },
    { title: "Drinks", list: list.drinks },
  ];
  displayCategories.sort((a, b) => b.list.length - a.list.length);
  return (
    <>
      <Grid item xs={false} sm={3} />
      <Grid item xs={12} sm={6}>
        <div className={classes.header}>
          <Typography>{list.title}</Typography>
          <Typography variant="subtitle2" className={classes.subTitle}>
            {formatDate(list.created)}
          </Typography>
        </div>
        <AddItem listId={id} currentUser={currentUser} />
        <List dense>
          {displayCategories.map((cat) => (
            <>
              <ListItem key={cat.id} className={classes.title}>
                <ListItemText primary={cat.title} />
              </ListItem>
              {cat.list.map((item) => {
                return (
                  <ShoppingListItem
                    catName={cat.title}
                    key={item.id}
                    item={item}
                  />
                );
              })}
            </>
          ))}
        </List>
      </Grid>
      <Grid item xs={false} sm={3} />
    </>
  );
}
