import { teal } from "@material-ui/core/colors";

/* INITIAL STATE */
export const initialState = {
  palette: {
    primary: teal,
    secondary: {
      main: "#e0f2f1",
    },
    type: "light",
  },
};

/* TYPES */
const TOGGLE_DARK_MODE = "TOGGLE_DARK_MODE";

/* ACTION CREATORS */
export const toggleDarkMode = () => ({
  type: TOGGLE_DARK_MODE,
});

/* REDUCER */
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case TOGGLE_DARK_MODE:
      return {
        ...state,
        palette: {
          ...state.palette,
          type: state.palette.type === "light" ? "dark" : "light",
        },
      };
    default:
      return state;
  }
};
