import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { makeStyles, Grid, useMediaQuery, useTheme } from "@material-ui/core";
import { Helmet } from "react-helmet-async";

const useStyles = makeStyles((theme) => ({
  childrenContainer: {
    height: "calc(100vh - 50px)",
    width: "100%",
    margin: 0,
  },
  childrenContainerMobile: {
    height: "calc(100vh - 53px)",
    width: "100%",
    margin: 0,
  },
}));

export default function Layout({ children, group = true, title }) {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = useStyles();
  return (
    <>
      <Helmet>
        <title>{title ? title : "FamilyDash"}</title>
      </Helmet>
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
