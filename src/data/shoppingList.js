import axios from "../axios";

// INITIAL STATE
export const initialState = {
  id: 0,
  title: "",
  created: "",
  other: [],
  meat: [],
  veggies: [],
  drinks: [],
  loading: false,
  error: "",
  addItem: {
    loading: false,
    error: "",
  },
};

// ACTION TYPES
export const START_LIST_SEARCH = "START_LIST_SEARCH";
export const SUCCESS_LIST_SEARCH = "SUCCESS_LIST_SEARCH";
export const ERROR_LIST_SEARCH = "ERROR_LIST_SEARCH";

export const START_ADD_LIST_ITEM = "START_ADD_LIST_ITEM";

export const TOGGLE_COMPLETED = "TOGGLE_COMPLETED";

// ACTION CREATORS
export const getList = (id) => (dispatch) => {
  dispatch(startSearch());
  axios
    .get(`/shopping_lists/${id}`)
    .then((response) => dispatch(successSearch(response.data)))
    .catch((error) => console.log(error.response));
};

export const startSearch = () => ({
  type: START_LIST_SEARCH,
});

export const successSearch = (data) => ({
  type: SUCCESS_LIST_SEARCH,
  payload: data,
});

export const errorSearch = () => ({
  type: ERROR_LIST_SEARCH,
});

export const addItem = ({ title, catId, listId, userId }) => (dispatch) => {
  dispatch(startAddItem());
  axios
    .post(`/shopping_list_items`, {
      title,
      shoppingList: `api/shopping_lists/${listId}`,
      user: `api/users/${userId}`,
      category: `api/shopping_categories/${catId}`,
    })
    .then((response) => dispatch(getList(listId)));
};

export const startAddItem = () => ({
  type: START_ADD_LIST_ITEM,
});

export const toggleCompleted = (data) => ({
  type: TOGGLE_COMPLETED,
  payload: data,
});

// REDUCER
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case START_LIST_SEARCH:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case SUCCESS_LIST_SEARCH:
      const other = [];
      const meat = [];
      const veggies = [];
      const drinks = [];
      payload.shoppingListItems.map((item) => {
        switch (item.category.name) {
          case "Other":
            other.push({ ...item, completed: false });
            break;
          case "Meat":
            meat.push({ ...item, completed: false });
            break;
          case "Veggies":
            veggies.push({ ...item, completed: false });
            break;
          case "Drinks":
            drinks.push({ ...item, completed: false });
            break;

          default:
            break;
        }
      });

      return {
        ...state,
        loading: false,
        id: payload.id,
        title: payload.title,
        created: payload.created,
        other: [...other],
        drinks: [...drinks],
        meat: [...meat],
        veggies: [...veggies],
      };

    case ERROR_LIST_SEARCH:
      return {
        ...state,
        loading: false,
        error: "Something went wrong",
      };

    case TOGGLE_COMPLETED:
      let i = 0;
      switch (payload.catName) {
        case "Other":
          i = state.other.findIndex((item) => item.id === payload.itemId);
          const newOther = state.other.map((e, ind) => {
            if (ind === i) return { ...e, completed: !e.completed };
            return e;
          });
          return { ...state, other: [...newOther] };
        case "Meat":
          i = state.meat.findIndex((item) => item.id === payload.itemId);
          const newMeat = state.meat.map((e, ind) => {
            if (ind === i) return { ...e, completed: !e.completed };
            return e;
          });
          return { ...state, meat: [...newMeat] };
        case "Veggies":
          i = veggies.findIndex((item) => item.id === payload.itemId);
          const newVeggies = state.veggies.map((e, ind) => {
            if (ind === i) return { ...e, completed: !e.completed };
            return e;
          });
          return { ...state, veggies: [...newVeggies] };
        case "Drinks":
          i = drinks.findIndex((item) => item.id === payload.itemId);
          const newDrinks = state.drinks.map((e, ind) => {
            if (ind === i) return { ...e, completed: !e.completed };
            return e;
          });
          return { ...state, drinks: [...newDrinks] };

        default:
          break;
      }

    default:
      return state;
  }
};
