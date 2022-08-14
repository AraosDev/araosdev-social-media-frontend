import { useCallback } from "react";

export const unixTimeToReadableFormat = (unixTime) => {
  const date = new Date(unixTime * 1000);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let formattedDate = `${date.getDate()} ${
    months[date.getMonth()]
  } ${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;

  return formattedDate;
};

export const currentUser = () =>
  localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo")).userName
    : "";

export const currentUserInfo = () =>
  localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : {};

export const debounce = (func, delay) => {
  let timer;
  return function () {
    let self = this;
    let args = arguments;
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(self, args);
    }, delay);
  }
}

export function useDebounce(callback, delay) {
  const debouncedFn = useCallback(
    debounce((...args) => callback(...args), delay),
    [delay]
  );

  return debouncedFn;
}

export const frndUserRelations = {
  "ADD_FRIEND": { label: 'Add Friend', reqType: 'SEND_REQ', loaderLabel: 'Sending Request' },
  "ACCEPT_REQ": { label: 'Accept Request', reqType: 'ACCEPT_REQ', loaderLabel: 'Accepting Request' },
  "REJECT_REQ": { label: 'Reject Request', reqType: 'REJECT_REQ', loaderLabel: 'Rejecting Request' },
  "REVOKE_REQ": { label: 'Revoke Request', reqType: 'REVOKE_REQ', loaderLabel: 'Revoking Request' },
  "REMOVE_FRIEND": { label: 'Remove Friend', reqType: 'REMOVE_FRIEND', loaderLabel: 'Removing Friend' },
}

export const randomString = (len) => {
  const chars = '0123456789abcdefghighijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  for(var i=len; i>0; --i) {
    result += chars[Math.round(Math.random() * (chars.length - 1))];
  }
  return result;
}
