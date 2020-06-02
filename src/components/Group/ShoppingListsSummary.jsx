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
    position: "absolute",
    top: "-15px",
    left: "5px",
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
    width: "97%",
  },
}));

export default function ShoppingListsSummary({ alignCenter, mobile }) {
  const classes = useStyles();
  //TODO: De shopping lists binnenhalen uit de api
  return (
    <>
      <List>
        {mobile ? (
          <ListItem>
            <ListItemText
              className={alignCenter === true ? classes.centerText : ""}
            >
              <Typography variant="h5">Shopping Lists</Typography>
              <Link to="/notes" className="underlined">
                <Typography variant="subtitle2">All shopping lists</Typography>
              </Link>
            </ListItemText>
          </ListItem>
        ) : (
          <div className={classes.title}>
            <Typography variant="h5" style={{ flexGrow: 1 }}>
              Shopping Lists
            </Typography>
            <Link to="/notes" className="underlined">
              <Typography variant="subtitle2">All shopping lists</Typography>
            </Link>
          </div>
        )}
        <div style={{ marginTop: ".8em" }}></div>
      </List>
    </>
  );
}
