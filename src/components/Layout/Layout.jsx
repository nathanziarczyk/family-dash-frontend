import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { makeStyles, Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  childrenContainer: {
    height: "calc(100vh - 128px)",
    margin: 0,
  },
}));

export default function Layout({ children }) {
  const classes = useStyles();

  return (
    <>
      <Header />
      <Grid container className={classes.childrenContainer}>
        {children}
      </Grid>
      <Footer />
    </>
  );
}
