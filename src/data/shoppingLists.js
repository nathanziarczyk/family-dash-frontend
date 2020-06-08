import axios from "../axios";

// INITIAL STATE
export const initialState = {
  shoppingLists: [],
  loading: false,
  error: { bool: false, msg: "" },
};

// ACTION TYPES
const START_LISTS_SEARCH = "START_LISTS_SEARCH";
const SUCCESS_LISTS_SEARCH = "SUCCESS_LISTS_SEARCH";
const ERROR_LISTS_SEARCH = "ERROR_LISTS_SEARCH";

// ACTION CREATORS
export const getLists = (groupId) => (dispatch) => {
  startListsSearch();
  axios
    .get()
    .then((response) => {
      successListsSearch();
    })
    .catch((error) => {
      errorListsSearch();
    });
};

export const startListsSearch = () => ({
  type: START_LISTS_SEARCH,
});

export const successListsSearch = (data) => ({
  type: SUCCESS_LISTS_SEARCH,
  payload: data,
});

export const errorListsSearch = () => ({
  type: ERROR_LISTS_SEARCH,
});

// REDUCER
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case START_LISTS_SEARCH:
      return {
        ...state,
        loading: true,
        error: {
          bool: false,
          msg: "",
        },
      };

    case SUCCESS_LISTS_SEARCH:
      return {
        ...state,
        loading: false,
        error: {
          bool: false,
          msg: "",
        },
        shoppingLists: payload,
      };

    case ERROR_LISTS_SEARCH:
      return {
        ...state,
        loading: false,
        error: {
          bool: true,
          msg: "Something went wrong",
        },
      };

    default:
      return state;
  }
};
