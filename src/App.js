import React from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import NotFound from "./components/ReUsable/NotFound";
import LoginRegister from "./components/LoginRegister/LoginRegister";
import Overview from "./components/Overview/Overview";
import Layout from "./components/Layout/Layout";
import Group from "./components/Group/Group";
import Calendar from "./components/Calendar/Calendar";
import EventDetail from "./components/ReUsable/EventDetail";

function App() {
  const themeData = useSelector((state) => state.theme);
  const user = useSelector((state) => state.user.loggedIn);
  const theme = createMuiTheme(themeData);
  const loggedIn = user;

  return (
    <ThemeProvider theme={theme}>
      <Helmet>
        <title>FamilyDash</title>
      </Helmet>
      <Route
        exact
        path="/"
        render={() => {
          return loggedIn ? <Redirect to="/overview" /> : <LoginRegister />;
        }}
      />
      <Route
        path="/overview"
        render={() => {
          return !loggedIn ? (
            <Redirect to="/" />
          ) : (
            <Layout>
              <Overview />
            </Layout>
          );
        }}
      />
      <Route
        path="/group/:id"
        render={(props) => {
          return !loggedIn ? (
            <Redirect to="/" />
          ) : (
            <Layout>
              <Group props={props} />
            </Layout>
          );
        }}
      />
      <Route
        path="/calendar"
        render={(props) => {
          return !loggedIn ? (
            <Redirect to="/" />
          ) : (
            <Layout>
              <Calendar props={props} />
            </Layout>
          );
        }}
      />
      <Route
        path="/event/:id"
        render={(props) => {
          return !loggedIn ? (
            <Redirect to="/" />
          ) : (
            <Layout>
              <EventDetail props={props} />
            </Layout>
          );
        }}
      />
      {/* <Route render={() => <NotFound />} /> */}
    </ThemeProvider>
  );
}

export default App;
