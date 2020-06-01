import axios from "../axios";

export const createEvent = (title, description, start, end, groep) => {
  console.log(title, description, start, end, groep);
  return axios
    .post("/events", {
      title,
      description,
      start,
      end,
      groep: `/api/groups/${groep}`,
    })
    .then((response) => true)
    .catch((error) => false);
};
