import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { makeStyles, Grid, useMediaQuery, useTheme } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  childrenContainer: {
    height: "calc(100vh - 50px)",
    width: "100%",
    margin: 0,
  },
  childrenContainerMobile: {
    height: "calc(100vh - 50px)",
    width: "100%",
    margin: 0,
  },
}));

export default function Layout({ children, group = true }) {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = useStyles();
  return (
    <>
      <Header group={group} mobile={mobile} />
      <Grid
        container
        className={
          mobile ? classes.childrenContainerMobile : classes.childrenContainer
        }
      >
        {children}
      </Grid>
      {/* {!mobile && <Footer />} */}
    </>
  );
}
