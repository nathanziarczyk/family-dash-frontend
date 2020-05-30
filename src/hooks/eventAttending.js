//TODO: afwerken

import axios from "../axios";

export const useAttending = (eventId, type, currentUserId, dispatch) => {
  //TODO: ID RECHTREEKS UIT RESPONSE
  //TODO: CUSTOM HOOK VAN MAKEN
  const setAttending = () => {
    const arr = eventId.split("/");
    const id = arr[arr.length - 1];
    if (type === "remove") {
      axios
        .put(`/events/${id}`, {
          removeAttendant: `/api/users/${currentUserId}`,
        })
        .then((response) => {
          dispatch(searchEvents(groupId));
        })
        .catch((error) => console.log(error.response));
    } else {
      axios
        .put(`/events/${id}`, {
          newAttendant: `/api/users/${currentUserId}`,
        })
        .then((response) => {
          dispatch(searchEvents(groupId));
        })
        .catch((error) => console.log(error.response));
    }
  };
  return setAttending;
};
