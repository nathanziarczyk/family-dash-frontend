import React, { useState } from "react";
import { Fab, makeStyles } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "absolute",
    bottom: "20px",
    left: "20px",
    transition: "all 500ms ease",
    zIndex: 100,
  },
  heartIcon: {
    marginRight: theme.spacing(1),
  },
}));
export default function BLM() {
  const [fabHover, setFabHover] = useState(false);
  const classes = useStyles();
  return (
    <div>
      <a
        href="https://secure.actblue.com/donate/ms_blm_homepage_2019"
        target="_blank"
      >
        <Fab
          color="secondary"
          variant="extended"
          className={classes.fab}
          onMouseEnter={setFabHover}
          onMouseLeave={() => setFabHover(false)}
        >
          <FavoriteIcon
            htmlColor="black"
            className={fabHover ? classes.heartIcon : ""}
          />
          {fabHover && "Black Lives Matter"}
        </Fab>
      </a>
    </div>
  );
}
