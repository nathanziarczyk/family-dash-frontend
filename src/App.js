import React from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { useSelector } from "react-redux";
import { Route, Redirect, Switch } from "react-router-dom";

import LoginRegister from "./components/LoginRegister/LoginRegister";
import Overview from "./components/Overview/Overview";
import Layout from "./components/Layout/Layout";
import Group from "./components/Group/Group";
import Calendar from "./components/Events/Calendar/Calendar";
import EventDetail from "./components/Events/EventDetail";
import Notes from "./components/Notes/Notes";
import NoteDetail from "./components/Notes/NoteDetail";
import BLM from "./components/ReUsable/BLM";

import "./styles.scss";
import Logout from "./components/ReUsable/Logout";
import NotFound from "./components/Error/NotFound";
import NotAllowed from "./components/Error/NotAllowed";
import ShoppingLists from "./components/ShoppingLists/ShoppingLists";
import ShoppingListDetail from "./components/ShoppingLists/ShoppingListDetail";

function App() {
  const themeData = useSelector((state) => state.theme);
  const loggedIn = useSelector((state) => state.user.loggedIn);
  const theme = createMuiTheme(themeData);

  return (
    <ThemeProvider theme={theme}>
      <Switch>
        {/* <BLM /> */}
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
              <Layout title="Overview" group={false}>
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
              <Layout title="Calendar">
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
        <Route
          path="/notes"
          render={(props) => {
            return !loggedIn ? (
              <Redirect to="/" />
            ) : (
              <Layout title="Notes">
                <Notes props={props} />
              </Layout>
            );
          }}
        />
        <Route
          path="/note/:id"
          render={(props) => {
            return !loggedIn ? (
              <Redirect to="/" />
            ) : (
              <Layout>
                <NoteDetail props={props} />
              </Layout>
            );
          }}
        />
        <Route
          path="/shopping-lists"
          render={(props) => {
            return !loggedIn ? (
              <Redirect to="/" />
            ) : (
              <Layout title="Shopping lists">
                <ShoppingLists />
              </Layout>
            );
          }}
        />
        <Route
          path="/shopping-list/:id"
          render={(props) => {
            return !loggedIn ? (
              <Redirect to="/" />
            ) : (
              <Layout>
                <ShoppingListDetail props={props} />
              </Layout>
            );
          }}
        />
        <Route path="/logout" component={Logout} />
        <Route
          exact
          render={() => {
            return !loggedIn ? (
              <Redirect to="/" />
            ) : (
              <Layout title="Not found" group={false}>
                <NotFound />
              </Layout>
            );
          }}
        />
        <Route
          exact
          path="/not-allowed"
          render={() => {
            return !loggedIn ? (
              <Redirect to="/" />
            ) : (
              <Layout title="Not allowed" group={false}>
                <NotAllowed />
              </Layout>
            );
          }}
        />
      </Switch>
    </ThemeProvider>
  );
}

export default App;
