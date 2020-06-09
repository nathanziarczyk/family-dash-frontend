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
} from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { formatDate } from "../../helpers/formatDate";

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
}));

export default function ShoppingLists() {
  const { shoppingLists, loading, error } = useSelector(
    (state) => state.shoppingLists
  );
  const classes = useStyles();
  const [page, setPage] = useState(1);

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
        <div>
          <Typography>Shopping Lists</Typography>
        </div>
        <List className={classes.list}>
          {shoppingLists.map((list, i) => {
            if (i >= minItems && i <= maxItems)
              return (
                <Link to={`/shopping-list/${list.id}`}>
                  <ListItem button>
                    <ListItemText
                      primary={list.title}
                      secondary={formatDate(list.created)}
                    />
                    <Typography variant="subtitle2">
                      {list.shoppingListItems.length > 0
                        ? `${list.shoppingListItems.length} items`
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
    </>
  );
}
