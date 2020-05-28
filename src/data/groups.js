import axios from "../axios";

/* INITIAL STATE */
export const initialState = {
  groups: [],
  invitations: [],
  loading: false,
  error: {
    bool: false,
    message: "",
  },
  newGroupMessage: "",
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
  dispatch(startSearch());
  axios
    .get(`/groups`)
    .then((response) => {
      console.log("zoeken...");
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

export const newGroup = ({ groupName, users }) => (dispatch) => {
  dispatch(startNewGroup());
  axios
    .post(`/groups`, {
      name: groupName,
      postGroupMembers: users,
    })
    .then((response) => {
      console.log(response);
      dispatch(getGroups());
      dispatch(successNewGroup(`Group ${groupName} created`));
    })
    .catch((error) => console.log(error.response)); //TODO: dispatch error
};

export const startNewGroup = () => ({
  type: NEW_GROUP_START,
});
export const successNewGroup = (message) => ({
  type: NEW_GROUP_SUCCESS,
  payload: message,
});
export const errorNewGroup = (message) => ({
  type: NEW_GROUP_ERROR,
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

    case NEW_GROUP_START:
      return {
        ...state,
        loading: true,
      };

    case NEW_GROUP_SUCCESS:
      return {
        ...state,
        newGroupMessage: payload,
        loading: false,
      };

    default:
      return state;
  }
};
