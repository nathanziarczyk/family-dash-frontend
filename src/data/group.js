import axios from "axios";
import Cookies from "js-cookie";

/* INITIAL STATE */
export const initialState = {
  id: 0,
  name: "",
  members: [],
  events: [],
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
    .get(`${process.env.REACT_APP_API}/groups/${id}`, {
      headers: {
        Authorization: `Bearer ${Cookies.get("jwt")}`,
      },
    })
    .then((response) => {
      dispatch(groupSuccessLoad(response.data));
    })
    .catch((error) => {
      dispatch(groupErrorLoad("errrrror"));
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
      const { id, name, groupMembers, events } = payload;
      return {
        ...state,
        loading: false,
        id: id,
        name: name,
        members: groupMembers,
        events: events,
      };

    case GROUP_ERROR_LOAD:
      console.log(payload);
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
