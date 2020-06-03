import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  centerText: { textAlign: "center" },
  title: {
    background: theme.palette.primary.dark,
  },
  list: {
    height: "85.8%",
    paddingTop: 0,
  },
  titleText: {
    color: "white",
  },
}));

export default function ShoppingListsSummary({ alignCenter, mobile }) {
  const classes = useStyles();
  //TODO: De shopping lists binnenhalen uit de api
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
    </>
  );
}
