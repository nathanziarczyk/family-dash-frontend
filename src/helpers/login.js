import axios from "axios";

export const loginUser = (email, pass) => {
  return axios.post(`${process.env.REACT_APP_API}/login`, {
    username: email,
    password: pass,
  });
};
