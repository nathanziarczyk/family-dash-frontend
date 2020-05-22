import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import Cookies from "js-cookie";

import themeReducer from "./theme";
import userReducer from "./user";
import groupsReducer from "./groups";

const persistedTheme = persistReducer({ key: "theme", storage }, themeReducer);
const persistedUser = persistReducer({ key: "user", storage }, userReducer);
const persistedGroups = persistReducer(
  { key: "groups", storage },
  groupsReducer
);

const appReducer = combineReducers({
  theme: persistedTheme,
  user: persistedUser,
  groups: persistedGroups,
});

const rootReducer = (state, action) => {
  if (action.type === "USER_LOGOUT") {
    state = undefined;
    window.localStorage.clear();
    Cookies.remove("jwt");
  }
  return appReducer(state, action);
};

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
export const persistor = persistStore(store);
