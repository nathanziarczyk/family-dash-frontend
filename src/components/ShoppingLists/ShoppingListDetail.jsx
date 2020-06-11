import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Grid,
  Typography,
  makeStyles,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Menu,
  MenuItem,
} from "@material-ui/core";
import Skeleton from "react-loading-skeleton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import RefreshIcon from "@material-ui/icons/Refresh";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";

import { getList } from "../../data/shoppingList";
import { formatDate } from "../../helpers/formatDate";
import ShoppingListItem from "./ShoppingListItem";
import AddItem from "./AddItem";

const useStyles = makeStyles((theme) => ({
  header: {
    backgroundColor: theme.palette.primary.dark,
    color: "white",
    padding: theme.spacing(2),
    position: "relative",
  },
  title: {
    backgroundColor: theme.palette.secondary.main,
  },
  subTitle: {
    fontWeight: "lighter",
  },
  moreIcon: {
    position: "absolute",
    top: "10px",
    right: "10px",
    zIndex: 1,
    color: "white",
  },
}));

export default function ShoppingListDetail({ props }) {
  const dispatch = useDispatch();
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(false);

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

  const handleOpenMore = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Grid item xs={false} sm={3} />
      <Grid item xs={12} sm={6}>
        <div className={classes.header}>
          {list.loading ? (
            <Skeleton />
          ) : (
            <>
              <Typography>{list.title}</Typography>
              <Typography variant="subtitle2" className={classes.subTitle}>
                {formatDate(list.created)}
              </Typography>
              <IconButton className={classes.moreIcon} onClick={handleOpenMore}>
                <MoreVertIcon />
              </IconButton>
              <Menu
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: "top", horizontal: "left" }}
                transformOrigin={{ vertical: "top", horizontal: "center" }}
              >
                <MenuItem>
                  <RefreshIcon /> Refresh List
                </MenuItem>
                <MenuItem>
                  <RotateLeftIcon /> Reset List
                </MenuItem>
              </Menu>
            </>
          )}
        </div>
        {!list.loading && (
          <>
            <AddItem
              listId={id}
              currentUser={currentUser}
              addLoading={list.addItem.loading}
            />
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
                        listId={id}
                      />
                    );
                  })}
                </>
              ))}
            </List>
          </>
        )}
      </Grid>
      <Grid item xs={false} sm={3} />
    </>
  );
}
