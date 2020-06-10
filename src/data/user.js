import axios from "axios";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";

import { getGroups } from "./groups";

/* INITIAL STATE */
export const initialState = {
  user: {
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
  },
  request: {
    error: {
      bool: false,
      msg: "",
    },
  },
  loggedIn: false,
};

/* ACTION TYPES */
export const USER_SUCCESS_LOGIN = "USER_SUCCESS_LOGIN";

export const USER_SUCCESS_REGISTER = "USER_SUCCESS_REGISTER";

export const USER_START_ACCEPT_REQUEST = "USER_START_ACCEPT_REQUEST";
export const USER_SUCCESS_ACCEPT_REQUEST = "USER_SUCCESS_ACCEPT_REQUEST";
export const USER_ERROR_ACCEPT_REQUEST = "USER_ERROR_ACCEPT_REQUEST";

export const USER_LOGOUT = "USER_LOGOUT";

/* ACTION CREATORS */

export const logoutUser = () => ({
  type: USER_LOGOUT,
});

export const successLogin = (data) => ({
  type: USER_SUCCESS_LOGIN,
  payload: data,
});

export const succesRegister = (data) => ({
  type: USER_SUCCESS_REGISTER,
  payload: data,
});

export const userAcceptRequest = ({ groupId, userId }) => (dispatch) => {
  axios
    .put(
      `${process.env.REACT_APP_API}/users/${userId}`,
      {
        acceptGroupRequest: `/api/groups/${groupId}`,
      },
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("jwt")}`,
        },
      }
    )
    .then((response) => dispatch(getGroups()))
    .catch((error) => console.log(error.response));
};

export const userDenyRequest = (requestId) => (dispatch) => {
  axios
    .delete(`${process.env.REACT_APP_API}/group_members/${requestId}`, {
      headers: {
        Authorization: `Bearer ${Cookies.get("jwt")}`,
      },
    })
    .then((response) => dispatch(getGroups()))
    .catch((error) => console.log(error.response)); // TODO: dispatch error
};

/* REDUCER */
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case USER_SUCCESS_LOGIN:
      const user = jwt_decode(payload.jwt);
      Cookies.set("jwt", payload.jwt, { sameSite: "Strict" });
      Cookies.set("refresh", payload.refresh, { sameSite: "Strict" });
      return {
        ...state,
        user: {
          firstName: user.first_name,
          lastName: user.last_name,
          id: user.id,
          email: user.email,
        },
        login: {
          ...state.login,
          loading: false,
        },
        loggedIn: true,
      };

    case USER_SUCCESS_REGISTER:
      return {
        ...state,
        register: {
          ...state.register,
          loading: false,
        },
      };

    default:
      return state;
  }
};
