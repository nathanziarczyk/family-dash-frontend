import axios from "axios";
import Cookies from "js-cookie";

export const searchUsersByEmail = (email) => {
  let arr = [];
  axios
    .get(`${process.env.REACT_APP_API}/users?email=${email}`, {
      headers: {
        Authorization: `Bearer ${Cookies.get("jwt")}`,
      },
    })
    .then((response) => {
      arr.push(...response.data["hydra:member"]);
    });
  return arr;
};
