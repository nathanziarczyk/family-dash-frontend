import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { makeStyles, Grid, useMediaQuery, useTheme } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  childrenContainer: {
    height: "calc(100vh - 128px)",
    margin: 0,
  },
  childrenContainerMobile: {
    height: "calc(100vh - 56px)",
    margin: 0,
  },
}));

export default function Layout({ children }) {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = useStyles();
  return (
    <>
      <Header />
      <Grid
        container
        className={
          mobile ? classes.childrenContainerMobile : classes.childrenContainer
        }
      >
        {children}
      </Grid>
      {!mobile && <Footer />}
    </>
  );
}
