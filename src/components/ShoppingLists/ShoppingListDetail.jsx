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
  CircularProgress,
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import RefreshIcon from "@material-ui/icons/Refresh";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import { useHistory } from "react-router-dom";

import { getList, resetState, deleteList } from "../../data/shoppingList";
import { formatDate } from "../../helpers/formatDate";
import ShoppingListItem from "./ShoppingListItem";
import AddItem from "./AddItem";
import RenameModal from "./RenameModal";

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
  const history = useHistory();

  const [anchorEl, setAnchorEl] = useState(false);

  const [open, setOpen] = useState(false);

  const list = useSelector((state) => state.shoppingList);
  const currentUser = useSelector((state) => state.user.user.id);

  const id = props.match.params.id;

  const refreshList = () => {
    handleClose();
    dispatch(getList(id));
  };

  const resetList = () => {
    handleClose();
    localStorage.removeItem(`persist:list-${id}`);
    dispatch(getList(id));
  };

  const deleteListFn = () => {
    handleClose();
    dispatch(deleteList(id));
    history.goBack();
  };

  const renameList = () => {
    handleClose();
    setOpen(true);
  };

  useEffect(() => {
    dispatch(getList(id));
    return () => {
      dispatch(resetState());
    };
  }, [dispatch, id]);

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
            <CircularProgress size={35} color="secondary" />
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
                <MenuItem onClick={renameList}>Rename List</MenuItem>
                <MenuItem onClick={deleteListFn}>Delete List</MenuItem>
                <MenuItem onClick={refreshList}>
                  <RefreshIcon /> Refresh List
                </MenuItem>
                <MenuItem onClick={resetList}>
                  <RotateLeftIcon /> Reset List
                </MenuItem>
              </Menu>
            </>
          )}
        </div>
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
                {list.loading && <CircularProgress size={10} color="primary" />}
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
      </Grid>
      <Grid item xs={false} sm={3} />
      <RenameModal open={open} setOpen={setOpen} id={id} current={list.title} />
    </>
  );
}
