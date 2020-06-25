import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/es/integration/react";
import { store, persistor } from "./data/index";
import { CircularProgress } from "@material-ui/core";
import { HelmetProvider } from "react-helmet-async";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import HttpsRedirect from "react-https-redirect";

import history from "./history";

ReactDOM.render(
  <Provider store={store}>
    <HttpsRedirect>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <BrowserRouter history={history}>
          <HelmetProvider>
            <PersistGate
              loading={<CircularProgress color="secondary" size="1.8em" />}
              persistor={persistor}
            >
              <React.Fragment>
                <App />
              </React.Fragment>
            </PersistGate>
          </HelmetProvider>
        </BrowserRouter>
      </MuiPickersUtilsProvider>
    </HttpsRedirect>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
