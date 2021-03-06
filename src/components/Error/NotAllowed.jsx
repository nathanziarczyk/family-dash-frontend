import React from "react";
import { makeStyles, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

// EEN PAGINA DIE WORDT WEERGEGEVEN ALS DE RESPONSE VAN AXIOS
// 405 NOT ALLOWED IS

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

export default function NotAllowed() {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Typography variant="h6" color="primary">
        Oops...
      </Typography>
      <Typography variant="subtitle2">
        It seems that you're not allowed to access this page. <br />
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
