import axios from "../axios";

export const editEvent = (title, description, start, end, id) => {
  return axios
    .put(`/events/${id}`, {
      title,
      description,
      start,
      end,
    })
    .then((response) => true)
    .catch((error) => console.log(error.response));
};
