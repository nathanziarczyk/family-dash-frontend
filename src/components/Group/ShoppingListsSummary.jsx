import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  makeStyles,
  IconButton,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";

const useStyles = makeStyles((theme) => ({
  centerText: { textAlign: "center" },
}));

export default function ShoppingListsSummary({ alignCenter, mobile }) {
  const classes = useStyles();
  //TODO: De shopping lists binnenhalen uit de api
  return (
    <>
      <List>
        <ListItem style={{ position: "relative" }}>
          <ListItemText
            className={alignCenter === true ? classes.centerText : ""}
          >
            {mobile && (
              <Link to="/">
                <div style={{ position: "absolute", top: 2, left: 10 }}>
                  <IconButton style={{}}>
                    <HomeIcon />
                  </IconButton>
                </div>
              </Link>
            )}
            <Typography variant="h5">Shopping Lists</Typography>
            <Typography variant="subtitle2">Show all</Typography>
          </ListItemText>
        </ListItem>
      </List>
    </>
  );
}
