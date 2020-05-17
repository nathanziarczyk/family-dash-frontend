import Cookie from "js-cookie";

// Helper functions om te bepalen of de user ingelogd is
export const loggedIn = Cookie.get("JWT") === undefined ? false : true;
