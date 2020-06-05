import axios from "../axios";

export const editNote = (id, title, body) => {
  return axios.put(`/notes/${id}`, {
    title,
    body,
  });
};
