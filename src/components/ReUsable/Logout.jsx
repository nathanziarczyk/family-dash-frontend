import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "./../../data/user";
import { useHistory } from "react-router-dom";

export default function Logout() {
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(logoutUser());
    history.push("/");
  }, []);
  return <p>Logout</p>;
}
