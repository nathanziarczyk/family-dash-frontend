import axios from "../axios";

// INITIAL STATE
export const initialState = {
  events: [],
  loading: false,
  error: {
    bool: false,
    msg: "",
  },
};

// ACTION TYPES
export const START_EVENTS_SEARCH = "START_EVENTS_SEARCH";
export const SUCCESS_EVENTS_SEARCH = "SUCCESS_EVENTS_SEARCH";
export const ERROR_EVENTS_SEARCH = "ERROR_EVENTS_SEARCH";

// ACTIONS CREATORS
export const searchEvents = (groupId) => (dispatch) => {
  dispatch(startEventsSearch());
  axios
    .get(`/groups/${groupId}`)
    .then((response) => {
      dispatch(successEventsSearch(response.data.events));
    })
    .catch((error) => dispatch(errorEventsSearch()));
};

export const startEventsSearch = () => ({
  type: START_EVENTS_SEARCH,
});

export const successEventsSearch = (events) => ({
  type: SUCCESS_EVENTS_SEARCH,
  payload: events,
});

export const errorEventsSearch = () => ({
  type: ERROR_EVENTS_SEARCH,
});

// REDUCER
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case START_EVENTS_SEARCH:
      return {
        ...state,
        loading: true,
        error: {
          bool: false,
          msg: "",
        },
      };

    case SUCCESS_EVENTS_SEARCH:
      return {
        ...state,
        events: payload,
        loading: false,
        error: {
          bool: false,
          msg: "",
        },
      };

    case ERROR_EVENTS_SEARCH:
      return {
        ...state,
        loading: false,
        error: {
          bool: true,
          msg: "Something went wrong when trying to load events",
        },
      };
    default:
      return state;
  }
};
