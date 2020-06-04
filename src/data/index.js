import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistCombineReducers } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import Cookies from "js-cookie";

import themeReducer from "./theme";
import userReducer from "./user";
import groupsReducer from "./groups";
import groupReducer from "./group";
import eventReducer from "./events";
import notesReducer from "./notes";

const persistConfig = {
  key: "root",
  whitelist: ["user.user", "events", "group"],
  storage,
};

const appReducer = persistCombineReducers(persistConfig, {
  user: userReducer,
  theme: themeReducer,
  groups: groupsReducer,
  group: groupReducer,
  events: eventReducer,
  notes: notesReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "USER_LOGOUT") {
    window.localStorage.clear();
    console.log(window.localStorage.getItem("persist:root"));
    Cookies.remove("jwt");
    state = undefined;
    console.log(window.localStorage.getItem("persist:root"));
  }
  return appReducer(state, action);
};

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
export const persistor = persistStore(store);
