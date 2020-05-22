import React from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

import LoginRegister from "./components/LoginRegister/LoginRegister";
import Overview from "./components/Overview/Overview";
import Layout from "./components/Layout/Layout";

function App() {
  const themeData = useSelector((state) => state.theme);
  const user = useSelector((state) => state.user.loggedIn);
  const theme = createMuiTheme(themeData);
  const loggedIn = user;

  return (
    <ThemeProvider theme={theme}>
      <Route exact path="/">
        {loggedIn ? <Redirect to="/overview" /> : <LoginRegister />}
      </Route>
      <Route path="/overview">
        {!loggedIn ? (
          <Redirect to="/" />
        ) : (
          <Layout>
            <Overview />
          </Layout>
        )}
      </Route>
    </ThemeProvider>
  );
}

export default App;
