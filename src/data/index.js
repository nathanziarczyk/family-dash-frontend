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
import shoppingListsReducer from "./shoppingLists";
import shoppingListReducer from "./shoppingList";

const persistConfig = {
  key: "root",
  whitelist: [
    "user",
    "events",
    "group",
    "notes",
    "shoppingLists",
    "shoppingList",
  ],
  storage,
};

const appReducer = persistCombineReducers(persistConfig, {
  user: userReducer,
  theme: themeReducer,
  groups: groupsReducer,
  group: groupReducer,
  events: eventReducer,
  notes: notesReducer,
  shoppingLists: shoppingListsReducer,
  shoppingList: shoppingListReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "USER_LOGOUT") {
    Cookies.remove("jwt");
    localStorage.removeItem("persist:root");
    state = undefined;
  }
  return appReducer(state, action);
};

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export const persistor = persistStore(store);
