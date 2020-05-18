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
      console.log(response);
      const groups = response.data.groups;
      const invitations = response.data.invitations;
      dispatch(successSearch(groups, invitations));
    })
    .catch((error) => {
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
    default:
      return state;
  }
};
