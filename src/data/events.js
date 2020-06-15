import axios from "../axios";

// INITIAL STATE
export const initialState = {
  events: [],
  upcoming: [],
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

export const EDIT_EVENT = "EDIT_EVENT";

export const CREATE_EVENT = "CREATE_EVENT";

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

export const createEvent = (title, description, start, end, groupId) => (
  dispatch
) => {
  dispatch(startEventsSearch());
  axios
    .post(`/events`, {
      title,
      description,
      start,
      end,
      groep: `api/groups/${groupId}`,
    })
    .then((response) => dispatch(searchEvents(groupId)))
    .catch(({ response }) => dispatch(errorEventsSearch()));
};

export const editEvent = (id, title, description, start, end, groupId) => (
  dispatch
) => {
  dispatch(startEventsSearch());
  axios
    .put(`/events/${id}`, {
      title,
      description,
      start,
      end,
    })
    .then((response) => dispatch(searchEvents(groupId)))
    .catch(({ response }) => console.log(response));
};

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
      const upcoming = payload.filter(
        (event) => new Date() <= new Date(event.start)
      );
      return {
        ...state,
        upcoming,
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
          msg: "Something went wrong, please try again later.",
        },
      };
    default:
      return state;
  }
};
