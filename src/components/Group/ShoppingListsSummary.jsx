import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  makeStyles,
  IconButton,
  Button,
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
  centerContainer: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

export default function ShoppingListsSummary({
  alignCenter,
  mobile,
  groupLoading,
}) {
  const classes = useStyles();

  // OPEN STATE VOOR NEW LIST MODAL
  const [open, setOpen] = useState(false);

  // LOADING STATE NA TOEVOEGEN
  const [addedLoading, setAddedLoading] = useState(false);

  // SHOPPING LISTS UIT REDUX STORE HALEN
  const { shoppingLists, loading } = useSelector(
    (state) => state.shoppingLists
  );

  // LOADING STATE GEBUNDELD VOOR CONDITIONAL RENDERING
  const loadingGlob = loading || groupLoading || addedLoading;
  const notLoadingAndNotEmpty = !loadingGlob && shoppingLists.length > 0;
  const notLoadingAndEmpty = !loadingGlob && shoppingLists.length === 0;

  // ITEMS PER PAGE OP BASIS VAN SCHERMGROOTTE
  const itemsPerPage = mobile ? Math.ceil(window.innerHeight * 0.01) : 2;

  return (
    <>
      <List dense className={classes.list}>
        <ListItem key="title" className={!mobile ? classes.title : ""}>
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
        {mobile &&
          (notLoadingAndEmpty ? (
            <IconButton
              color="primary"
              onClick={() => setOpen(true)}
              className={classes.floatingButton}
            >
              <AddCircleIcon fontSize="large" />
            </IconButton>
          ) : (
            ""
          ))}
        {notLoadingAndEmpty && (
          <div className={classes.centerContainer}>
            <Typography variant="subtitle2" align="center">
              Nothing to see here... <br />
              <Button color="primary" onClick={() => setOpen(true)}>
                Create List
              </Button>
            </Typography>
          </div>
        )}
        <div style={{ marginTop: ".8em" }}>
          {loadingGlob && (
            <>
              <ListItem key="loading-1">
                <ListItemText primary={<Skeleton width={300} />} />
              </ListItem>
              <ListItem key="loading-2">
                <ListItemText primary={<Skeleton width={300} />} />
              </ListItem>
            </>
          )}
          {notLoadingAndNotEmpty &&
            shoppingLists.map((list, i) => {
              if (i > itemsPerPage) return null;
              return (
                <Link key={list.list.id} to={`/shopping-list/${list.list.id}`}>
                  <ListItem button>
                    <ListItemText
                      primary={list.list.title}
                      secondary={formatDate(list.list.created)}
                    />
                  </ListItem>
                </Link>
              );
            })}
        </div>
      </List>
      {!mobile && notLoadingAndNotEmpty && (
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
