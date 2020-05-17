import React from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

import LoginRegister from "./components/LoginRegister/LoginRegister";
import Overview from "./components/Overview/Overview";

function App() {
  const themeData = useSelector((state) => state.theme);
  const user = useSelector((state) => state.user.loggedIn);
  const theme = createMuiTheme(themeData);
  // localStorage.removeItem("loggedIn");
  const loggedIn = localStorage.getItem("loggedIn") === "true" || user;
  return (
    <ThemeProvider theme={theme}>
      <Route exact path="/">
        {loggedIn ? <Redirect to="/overview" /> : <LoginRegister />}
      </Route>
      <Route path="/overview">
        {!loggedIn ? <Redirect to="/" /> : <Overview />}
      </Route>
    </ThemeProvider>
  );
}

export default App;
