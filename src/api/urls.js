import { apiConfig } from "./apiConfig";

const returnApiConfig = (product = "", property = "") => {
  const url = apiConfig[product];
  return `${url}/${property}`;
};

export const urls = {
  getLogin: (property) => returnApiConfig("LOGIN", property),
  getCreateAccount: (property) => returnApiConfig("CREATE_ACCOUNT", property),
  getTimelineImg: (property) => returnApiConfig("GET_TIMELINE_IMG", property),
  postUpdateImgMetaData: (property) =>
    returnApiConfig("UPDATE_IMG_METADATA", property),
};
