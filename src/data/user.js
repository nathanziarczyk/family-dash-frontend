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
  login: {
    error: {
      bool: false,
      msg: "",
    },
    loading: false,
  },
  register: {
    error: {
      bool: false,
      msg: "",
    },
    loading: false,
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

export const USER_START_REGISTER = "USER_START_REGISTER";
export const USER_SUCCESS_REGISTER = "USER_SUCCESS_REGISTER";
export const USER_ERROR_REGISTER = "USER_ERROR_REGISTER";

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

export const registerUser = (fn, ln, email, password) => (dispatch) => {
  dispatch(startRegister());
  axios
    .post(`${process.env.REACT_APP_API}/register`, {
      _username: email,
      _password: password,
      first_name: fn,
      last_name: ln,
    })
    .then((response) => {
      dispatch(succesRegister("Check your email to activate your account"));
    })
    .catch((error) => {
      dispatch(succesRegister("Check your email to activate your account"));
    });
};

export const startRegister = () => ({
  type: USER_START_REGISTER,
});

export const succesRegister = (data) => ({
  type: USER_SUCCESS_REGISTER,
  payload: data,
});

export const errorRegister = (message) => ({
  type: USER_ERROR_REGISTER,
  payload: message,
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
    .catch((error) => console.log(error.response)); // TODO: dispatch error
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
      Cookies.set("jwt", payload.jwt);
      Cookies.set("refresh", payload.refresh);
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

    case USER_START_REGISTER:
      return {
        ...state,
        register: {
          ...state.register,
          loading: true,
        },
      };

    case USER_SUCCESS_REGISTER:
      return {
        ...state,
        register: {
          ...state.register,
          loading: false,
        },
      };

    case USER_ERROR_REGISTER:
      return {
        ...state,
        register: {
          error: {
            bool: true,
            msg: payload,
          },
          loading: false,
        },
      };

    default:
      return state;
  }
};
