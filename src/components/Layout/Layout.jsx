import React, { useState } from "react";
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
  const [width, setWidth] = useState(window.innerWidth);
  window.addEventListener("resize", (e) => {
    setWidth(window.innerWidth);
  });
  return (
    <>
      <Header />
      <Grid container alignItems="center" className={classes.childrenContainer}>
        {children}
      </Grid>
      {width > 600 && <Footer />}
    </>
  );
}
