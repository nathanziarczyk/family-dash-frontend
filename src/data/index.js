import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import themeReducer from "./theme";
import userReducer from "./user";
const store = createStore(
  combineReducers({
    theme: themeReducer,
    user: userReducer,
  }),
  composeWithDevTools(applyMiddleware(thunk))
);

store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem("loggedIn", state.user.loggedIn);
});

export default store;
