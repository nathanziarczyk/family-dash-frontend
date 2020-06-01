import axios from "../axios";

export const createNote = (title, body, groep) => {
  return axios
    .post("/notes", {
      title,
      body,
      groep: `/api/groups/${groep}`,
    })
    .then((response) => true)
    .catch((error) => false);
};
