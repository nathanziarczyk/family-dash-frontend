import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  makeStyles,
  IconButton,
} from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";

import AddListModal from "../ReUsable/AddListModal";
import { formatDate } from "../../helpers/formatDate";

const useStyles = makeStyles((theme) => ({
  centerText: { textAlign: "center" },
  title: {
    background: theme.palette.primary.dark,
  },
  list: {
    height: "70%",
    paddingTop: 0,
    position: "relative",
  },
  titleText: {
    color: "white",
  },
  addButtonContainer: {
    width: "100%",
    textAlign: "center",
  },
  floatingButton: {
    position: "absolute",
    right: "20px",
    top: "-5px",
  },
}));

export default function ShoppingListsSummary({
  alignCenter,
  mobile,
  groupLoading,
}) {
  const classes = useStyles();

  // Open state voor new list modal
  const [open, setOpen] = useState(false);

  //
  const [addedLoading, setAddedLoading] = useState(false);

  // Shopping lists ophalen
  const { shoppingLists, loading } = useSelector(
    (state) => state.shoppingLists
  );

  const loadingGlob = loading || groupLoading || addedLoading;
  const notLoadingAndNotEmpty = !loadingGlob && shoppingLists.length > 0;

  return (
    <>
      <List dense className={classes.list}>
        <ListItem className={!mobile ? classes.title : ""}>
          <ListItemText
            className={alignCenter === true ? classes.centerText : ""}
          >
            <Link to="/shopping-lists">
              <Typography
                variant="h5"
                className={!mobile ? classes.titleText : ""}
              >
                Shopping Lists
              </Typography>
            </Link>
          </ListItemText>
        </ListItem>
        <div style={{ marginTop: ".8em" }}>
          {loadingGlob && (
            <>
              <ListItem>
                <ListItemText primary={<Skeleton width={300} />} />
              </ListItem>
              <ListItem>
                <ListItemText primary={<Skeleton width={300} />} />
              </ListItem>
            </>
          )}
          {notLoadingAndNotEmpty &&
            shoppingLists.map((list, i) => {
              if (!mobile) if (i > 2) return null;
              if (mobile) if (i > 8) return null;
              return (
                <Link to={`/shopping-list/${list.id}`}>
                  <ListItem button>
                    <ListItemText
                      primary={list.title}
                      secondary={formatDate(list.created)}
                    />
                  </ListItem>
                </Link>
              );
            })}
        </div>
      </List>
      {!mobile && !loadingGlob && (
        <div className={classes.addButtonContainer}>
          <IconButton color="primary" onClick={() => setOpen(true)}>
            <AddCircleIcon fontSize="large" />
          </IconButton>
        </div>
      )}
      <AddListModal
        open={open}
        setOpen={setOpen}
        setAddedLoading={setAddedLoading}
      />
    </>
  );
}
