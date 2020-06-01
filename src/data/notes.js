import axios from "../axios";

// INITIAL STATE
export const initialState = {
  loading: false,
  error: {
    bool: false,
    msg: "",
  },
  notes: [],
};

// ACTION TYPES
export const START_NOTES_SEARCH = "START_NOTES_SEARCH";
export const SUCCESS_NOTES_SEARCH = "SUCCESS_NOTES_SEARCH";
export const ERROR_NOTES_SEARCH = "ERROR_NOTES_SEARCH";

// ACTION CREATORS
export const getNotes = (groupId) => (dispatch) => {
  dispatch(startNotesSearch());
  axios.get(`/groups/${groupId}`).then(console.log).catch(console.log);
};

export const startNotesSearch = () => ({
  type: START_NOTES_SEARCH,
});

export const successNotesSearch = (notes) => ({
  type: SUCCESS_NOTES_SEARCH,
  payload: notes,
});

export const errorNotesSearch = () => ({
  type: ERROR_NOTES_SEARCH,
});

// REDUCER
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case START_NOTES_SEARCH:
      return {
        ...state,
        loading: false,
        error: {
          bool: false,
          msg: "",
        },
      };
    case SUCCESS_NOTES_SEARCH:
      return {
        ...state,
        loading: false,
        error: {
          bool: false,
          msg: "",
        },
        notes: payload,
      };
    case ERROR_NOTES_SEARCH:
      return {
        ...state,
        loading: false,
        error: {
          bool: true,
          msg: "Error",
        },
      };
    default:
      return state;
  }
};
