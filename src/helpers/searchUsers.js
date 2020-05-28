import axios from "../axios";

export const searchUsersByEmail = (email) => {
  let arr = [];
  axios.get(`/users?email=${email}`).then((response) => {
    arr.push(...response.data["hydra:member"]);
  });
  return arr;
};
