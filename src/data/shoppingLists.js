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
  dispatch(startListsSearch());
  axios
    .get(`/groups/${groupId}`)
    .then((response) => {
      dispatch(successListsSearch(response.data.shoppingLists));
    })
    .catch((error) => {
      dispatch(errorListsSearch());
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

export const addList = (title, groupId) => (dispatch) => {
  dispatch(startListsSearch());
  axios
    .post(`/shopping_lists`, {
      title,
      groep: `api/groups/${groupId}`,
    })
    .then((response) => {
      const arr = response.data["@id"].split("/");
      const id = arr[arr.length - 1];
      window.location.replace(`/shopping-list/${id}`);
      dispatch(getLists(groupId));
    })
    .catch(({ response }) => dispatch(errorListsSearch()));
};

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
      const allLists = [];
      payload.map((list) => {
        const other = [];
        const meat = [];
        const veggies = [];
        const drinks = [];
        list.shoppingListItems.map((item) => {
          switch (item.category.name) {
            case "Other":
              other.push(item);
              break;
            case "Meat":
              meat.push(item);
              break;
            case "Veggies":
              veggies.push(item);
              break;
            case "Drinks":
              drinks.push(item);
              break;

            default:
              break;
          }
          return null;
        });
        allLists.push({
          list,
          other,
          drinks,
          meat,
          veggies,
        });
        return null;
      });
      return {
        ...state,
        loading: false,
        error: {
          bool: false,
          msg: "",
        },
        shoppingLists: allLists,
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
