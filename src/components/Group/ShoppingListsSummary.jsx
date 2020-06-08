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

export default function ShoppingListsSummary({ alignCenter, mobile }) {
  const classes = useStyles();

  // Open state voor new list modal
  const [open, setOpen] = useState(false);
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
        <div style={{ marginTop: ".8em" }}></div>
      </List>
      {!mobile && (
        <div className={classes.addButtonContainer}>
          <IconButton color="primary" onClick={() => setOpen(true)}>
            <AddCircleIcon fontSize="large" />
          </IconButton>
        </div>
      )}
    </>
  );
}
