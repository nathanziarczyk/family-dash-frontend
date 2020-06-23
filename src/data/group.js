import axios from "../axios";
import { successEventsSearch } from "./events";
import { successNotesSearch } from "./notes";
import { successListsSearch } from "./shoppingLists";
import { errorSearch } from "./groups";

/* INITIAL STATE */
export const initialState = {
  id: 0,
  name: "",
  members: [],
  loading: false,
  error: {
    bool: false,
    message: "",
  },
};

/* ACTION TYPES */
export const GROUP_START_LOAD = "GROUP_START_LOAD";
export const GROUP_SUCCESS_LOAD = "GROUP_SUCCESS_LOAD";
export const GROUP_ERROR_LOAD = "GROUP_ERROR_LOAD";

/* ACTION CREATORS */
export const loadGroup = (id) => (dispatch) => {
  dispatch(groupStartLoad());
  axios
    .get(`/groups/${id}`)
    .then((response) => {
      dispatch(groupSuccessLoad(response.data));
      dispatch(successEventsSearch(response.data.events));
      dispatch(successNotesSearch(response.data.notes));
      dispatch(successListsSearch(response.data.shoppingLists));
    })
    .catch((error) => {
      dispatch(errorSearch("Something went wrong"));
    });
};

export const groupStartLoad = () => ({
  type: GROUP_START_LOAD,
});

export const groupSuccessLoad = (data) => ({
  type: GROUP_SUCCESS_LOAD,
  payload: data,
});

export const groupErrorLoad = (message) => ({
  type: GROUP_ERROR_LOAD,
  payload: message,
});

/* REDUCER */
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GROUP_START_LOAD:
      return {
        ...state,
        loading: true,
      };

    case GROUP_SUCCESS_LOAD:
      const { id, name, groupMembers } = payload;
      return {
        ...state,
        loading: false,
        id: id,
        name: name,
        members: groupMembers,
      };

    case GROUP_ERROR_LOAD:
      return {
        ...state,
        loading: false,
        error: {
          bool: true,
          message: "",
        },
      };

    default:
      return state;
  }
};
