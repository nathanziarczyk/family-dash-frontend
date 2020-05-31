import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { makeStyles, Grid, useMediaQuery, useTheme } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  childrenContainer: {
    height: "calc(100vh - 128px)",
    margin: 0,
  },
  childrenContainerMobile: {
    height: "calc(100vh - 64px)",
    margin: 0,
  },
}));

export default function Layout({ children }) {
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = useStyles();
  const [width, setWidth] = useState(window.innerWidth);
  window.addEventListener("resize", (e) => {
    setWidth(window.innerWidth);
  });
  return (
    <>
      <Header />
      <Grid
        container
        className={
          matchesSM
            ? classes.childrenContainerMobile
            : classes.childrenContainer
        }
      >
        {children}
      </Grid>
      {width > 600 && <Footer />}
    </>
  );
}
