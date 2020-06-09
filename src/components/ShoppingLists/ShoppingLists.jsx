import React, { useState } from "react";
import {
  Grid,
  List,
  ListItemText,
  ListItem,
  Typography,
  useTheme,
  useMediaQuery,
  makeStyles,
  AppBar,
  IconButton,
} from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AddCircleIcon from "@material-ui/icons/AddCircle";

import { formatDate } from "../../helpers/formatDate";
import AddListModal from "../ReUsable/AddListModal";

const useStyles = makeStyles((theme) => ({
  list: {
    height: "80%",
  },
  pagination: {
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    bottom: "15px",
    left: "50%",
    transform: "translateX(-50%)",
    width: "100%",
  },
  title: {
    background: theme.palette.primary.dark,
    display: "flex",
    alignItems: "center",
    height: "50px",
    padding: "0 1em",
  },
}));

export default function ShoppingLists() {
  const { shoppingLists, loading, error } = useSelector(
    (state) => state.shoppingLists
  );
  const classes = useStyles();
  const [page, setPage] = useState(1);

  const [open, setOpen] = useState(false);

  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));

  const itemsPerPage = 8;

  // Bepalen welke items op de pagina worden weergegeven
  const minItems = (page - 1) * itemsPerPage;
  const maxItems = page * itemsPerPage - 1;

  const handlePagination = (e, value) => {
    setPage(value);
  };

  return (
    <>
      <Grid item xs={false} sm={3} />
      <Grid item xs={12} sm={6}>
        <div className={classes.title}>
          <Typography style={{ color: "white", flex: 1 }}>
            Shopping Lists
          </Typography>
          <IconButton onClick={setOpen} color="inherit">
            <AddCircleIcon />
          </IconButton>
        </div>
        <List className={classes.list}>
          {shoppingLists.map((list, i) => {
            if (i >= minItems && i <= maxItems)
              return (
                <Link key={list.list.id} to={`/shopping-list/${list.list.id}`}>
                  <ListItem button>
                    <ListItemText
                      primary={list.list.title}
                      secondary={formatDate(list.list.created)}
                    />
                    <Typography variant="subtitle2">
                      {list.list.shoppingListItems.length > 0
                        ? `${list.list.shoppingListItems.length} items`
                        : "No items"}
                    </Typography>
                  </ListItem>
                </Link>
              );
            else return null;
          })}
        </List>
        {shoppingLists.length > 0 && (
          <Pagination
            className={classes.pagination}
            count={Math.ceil(shoppingLists.length / itemsPerPage)}
            onChange={handlePagination}
          />
        )}
      </Grid>
      <Grid item xs={false} sm={3} />
      <AddListModal open={open} setOpen={setOpen} setAddedLoading={null} />
    </>
  );
}
