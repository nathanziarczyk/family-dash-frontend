import axios from "../axios";

export const deleteEvent = (id) => {
  return axios.delete(`/events/${id}`);
};
