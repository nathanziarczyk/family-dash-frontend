import axios from "axios";
import Cookie from "js-cookie";

const instance = axios.create({
  baseURL: "https://wdev.be/wdev_nathan/eindwerk/api",
});

instance.interceptors.request.use(
  (config) => {
    const token = Cookie.get("jwt");
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

//Add a response interceptor

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      originalRequest.url === "http://wdev.be/wdev_nathan/api/token/refresh"
    ) {
      // TODO: LOGOUT
      window.history.push("/logout");
      console.log("oei");
      return Promise.reject(error);
    }
    if (error.response.status === 401) {
      originalRequest._retry = true;
      const refreshToken = Cookie.get("refresh");
      return axios
        .post("https://wdev.be/wdev_nathan/eindwerk/api/token/refresh", {
          refresh_token: refreshToken,
        })
        .then((res) => {
          if (res.status === 200) {
            Cookie.remove("jwt");
            Cookie.remove("refresh");
            Cookie.set("jwt", res.data.token);
            Cookie.set("refresh", res.data.refresh_token);
            instance.defaults.headers.common["Authorization"] =
              "Bearer " + Cookie.get("jwt");
            return instance(originalRequest);
          }
        });
    }
    return Promise.reject(error);
  }
);

export default instance;
