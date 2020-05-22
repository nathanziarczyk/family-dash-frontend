import axios from "axios";
import Cookies from "js-cookie";

/* INITIAL STATE */
export const initialState = {
  groups: [],
  invitations: [],
  loading: false,
  error: {
    bool: false,
    message: "",
  },
};

/* ACTION TYPES */
export const GROUPS_START_SEARCH = "GROUPS_START_SEARCH";
export const GROUPS_SUCCESS_SEARCH = "GROUPS_SUCCESS_SEARCH";
export const GROUPS_ERROR_SEARCH = "GROUPS_ERROR_SEARCH";

export const NEW_GROUP_START = "NEW_GROUP_START";
export const NEW_GROUP_SUCCESS = "NEW_GROUP_SUCCESS";
export const NEW_GROUP_ERROR = "NEW_GROUP_ERROR";

/* ACTION CREATORS */
export const getGroups = () => (dispatch) => {
  startSearch();
  axios
    .get(`${process.env.REACT_APP_API}/groups`, {
      headers: {
        Authorization: `Bearer ${Cookies.get("jwt")}`,
      },
    })
    .then((response) => {
      const groups = response.data.groups;
      const invitations = response.data.invitations;
      dispatch(successSearch(groups, invitations));
    })
    .catch((error) => {
      console.log("error");
      dispatch(errorSearch("Oops... Something went wrong, try again later"));
    });
};

export const startSearch = () => ({
  type: GROUPS_START_SEARCH,
});
export const successSearch = (groups, invitations) => ({
  type: GROUPS_SUCCESS_SEARCH,
  payload: { groups, invitations },
});
export const errorSearch = (message) => ({
  type: GROUPS_ERROR_SEARCH,
  payload: message,
});

export const newGroup = (groupName) => (dispatch) => {
  dispatch(startNewGroup());
  axios
    .post(
      `${process.env.REACT_APP_API}/groups`,
      {
        name: groupName,
      },
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("jwt")}`,
        },
      }
    )
    .then((response) => {
      dispatch(getGroups());
    })
    .catch((error) => console.log(error.response));
};

export const startNewGroup = () => ({
  type: NEW_GROUP_START,
});
export const errorNewGroup = () => ({
  type: NEW_GROUP_ERROR,
});
export const successNewGroup = () => ({
  type: NEW_GROUP_SUCCESS,
});

/* REDUCER */
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GROUPS_START_SEARCH:
      return {
        ...state,
        loading: true,
      };

    case GROUPS_SUCCESS_SEARCH:
      return {
        ...state,
        groups: payload.groups,
        invitations: payload.invitations,
        loading: false,
        error: {
          bool: false,
          message: "",
        },
      };

    case GROUPS_ERROR_SEARCH:
      return {
        ...state,
        loading: false,
        error: {
          bool: true,
          message: payload,
        },
      };

    case NEW_GROUP_START:
      return {
        ...state,
        loading: true,
      };

    default:
      return state;
  }
};
