import axios from "../axios";

export const addShoppingListItem = (newItem, catId, listId, userId) => {
  return axios.post("/shopping_list_items", {
    title: newItem,
    category: `api/shopping_categories/${catId}`,
    shoppingList: `api/shopping_lists/${listId}`,
    user: `api/users/${userId}`,
  });
};

export const addToState = (stateVars, id) => {
  return stateVars[id];
};
