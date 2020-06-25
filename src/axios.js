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

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    const originalRequest = error.config;
    if (error.response.status === 404) {
      window.location.href = `/not-found`;
      return null;
    }
    if (error.response.status === 403) {
      window.location.href = `/not-allowed`;
      return null;
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
        })
        .catch((error) => {
          localStorage.setItem("expired-token", "true");
          window.location.href = `/logout`;
          return Promise.reject(error);
        });
    }
    return Promise.reject(error);
  }
);

export default instance;
