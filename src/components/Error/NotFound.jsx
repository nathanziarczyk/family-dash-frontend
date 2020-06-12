import React from "react";
import { makeStyles, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
}));

// EEN PAGINA DIE WORDT WEERGEGEVEN ALS DE RESPONSE VAN AXIOS
// 404 NOT FOUND IS

export default function NotFound() {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Typography variant="h6" color="primary">
        Oops...
      </Typography>
      <Typography variant="subtitle2">
        Could not find the requested page.
      </Typography>
      <Typography variant="subtitle2">
        Are you sure you requested the right page?
      </Typography>
      <Typography variant="subtitle2">
        Go to the{" "}
        <Link to="/" className="underlined">
          <b>homepage </b>
        </Link>
        or try logging out if the problem keeps occuring
      </Typography>
    </div>
  );
}
