import { urls } from "./urls";
import axios from "axios";

export const getLoginApi = (property, req) => {
  const url = urls["getLogin"](property);
  return axios.post(url, req);
};

export const getCreateAccountApi = (property, req) => {
  const url = urls["getCreateAccount"](property);
  return axios.post(url, req);
};

export const getTimelineImgApi = (property) => {
  const url = urls["getTimelineImg"](property);
  return axios.get(url);
};

export const postUpdateImgMetaDataAPI = (property, reqBody) => {
  const url = urls["postUpdateImgMetaData"](property);
  return axios.post(url, reqBody);
};
