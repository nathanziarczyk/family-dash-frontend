import moment from "moment";

export const formatDate = (date) => {
  return `${moment(date).format("MMMM Do")} at ${moment(date).format(
    "k"
  )}:${moment(date).format("mm")}`;
};
