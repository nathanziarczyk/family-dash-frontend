import axios from "axios";

export const registerUser = (email, pass, fn, ln) => {
  return axios.post(`${process.env.REACT_APP_API}/register`, {
    _username: email,
    _password: pass,
    first_name: fn,
    last_name: ln,
  });
};
