import React from "react";
import Header from "./Header";
import { makeStyles, Grid, useMediaQuery, useTheme } from "@material-ui/core";
import { Helmet } from "react-helmet-async";

import favicon from "../../favicon.ico";

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
      {/* React Helmet variabele, wordt gebruikt vanuit Layout.jsx voor title */}
      <Helmet>
        <title>{title ? title : "FamilyDash"}</title>
        <link rel="shortcut icon" href={favicon} type="image/x-icon" />
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
    </>
  );
}
