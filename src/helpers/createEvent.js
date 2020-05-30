import React from "react";
import axios from "../axios";

export const createEvent = (title, description, start, end, groep) => {
  axios
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
